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

        // Buscar ou criar usuário
        let userId: string;
        
        if (session?.user?.email) {
            // Buscar usuário autenticado
            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            });
            
            if (!user) {
                // Se usuário autenticado não existe no banco, criar
                const newUser = await prisma.user.create({
                    data: {
                        email: session.user.email,
                        name: session.user.name || 'Usuário',
                        password: 'oauth-user' // Usuários OAuth não têm senha
                    }
                });
                userId = newUser.id;
            } else {
                userId = user.id;
            }
        } else {
            // Criar ou buscar usuário temporário para desenvolvimento
            const tempUser = await prisma.user.upsert({
                where: { email: 'temp@user.com' },
                update: {},
                create: {
                    email: 'temp@user.com',
                    name: 'Usuário Temporário',
                    password: 'temp-password-hash'
                }
            });
            userId = tempUser.id;
        }
        
        // Validar userId antes de continuar
        if (!userId) {
            throw new Error('Erro ao obter ID do usuário');
        }

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

        // Log detalhado do erro
        console.error('❌ Upload error:', error);
        console.error('Error name:', error?.constructor?.name);
        console.error('Error message:', error?.message);
        console.error('Error stack:', error?.stack);

        // Mensagem específica baseada no erro
        let errorMessage = 'Erro ao fazer upload';
        
        if (error?.message?.includes('Prisma')) {
            errorMessage = 'Erro de conexão com banco de dados. Verifique suas credenciais do Neon.';
        } else if (error?.message?.includes('Cloudinary') || error?.message?.includes('api_key')) {
            errorMessage = 'Erro no Cloudinary. Verifique suas credenciais de upload.';
        } else if (error?.message) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            { 
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error?.message : undefined
            },
            { status: 500 }
        );
    }
}
