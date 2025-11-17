import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cloudinary } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const uploadSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    tags: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        // Verificar autenticação
        const session = await getServerSession(authOptions);

        // TODO: Descomentar quando auth estiver funcionando
        // if (!session?.user?.email) {
        //     return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        // }

        const formData = await request.formData();
        const file = formData.get('image');
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const tagsString = formData.get('tags') as string;

        // Validar dados
        const validatedData = uploadSchema.parse({
            title,
            description: description || undefined,
            tags: tagsString || undefined,
        });

        // Validar arquivo
        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'Arquivo inválido' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Apenas imagens são permitidas' }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'Arquivo muito grande. Máximo: 10MB' }, { status: 400 });
        }

        // Upload para Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const uploadResult = await cloudinary.uploader.upload(
            `data:${file.type};base64,${base64}`,
            {
                folder: 'galeria-vanguard',
                transformation: [
                    { width: 2000, height: 2000, crop: 'limit' },
                    { quality: 'auto', fetch_format: 'auto' }
                ]
            }
        );

        // TODO: Pegar userId real da sessão
        // const userId = session.user.id;
        const userId = 'temp-user-id';

        // Processar tags
        const tagNames = tagsString
            ? tagsString.split(',').map((t) => t.trim()).filter(Boolean)
            : [];

        // Criar ou buscar tags
        type TagType = { id: string; name: string; slug: string };
        const tags: TagType[] = await Promise.all(
            tagNames.map(async (name) => {
                const slug = name.toLowerCase().replace(/\s+/g, '-');
                return prisma.tag.upsert({
                    where: { slug },
                    create: { name, slug },
                    update: {},
                });
            })
        );

        // Criar artwork
        const artwork = await prisma.artwork.create({
            data: {
                title: validatedData.title,
                description: validatedData.description || null,
                imageUrl: uploadResult.secure_url,
                imagePublicId: uploadResult.public_id,
                userId,
                tags: {
                    create: tags.map((tag: TagType) => ({
                        tag: {
                            connect: { id: tag.id }
                        }
                    }))
                }
            },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            artwork: {
                id: artwork.id,
                title: artwork.title,
                imageUrl: artwork.imageUrl,
                tags: artwork.tags.map((t: { tag: { name: string } }) => t.tag.name)
            }
        }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Erro ao fazer upload' },
            { status: 500 }
        );
    }
}
