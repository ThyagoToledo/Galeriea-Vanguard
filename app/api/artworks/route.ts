import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const artworkSchema = z.object({
    title: z.string().min(2),
    description: z.string().max(500).optional(),
    imageUrl: z.string().url(),
    imagePublicId: z.string(),
    tags: z.array(z.string()).default([])
});

export async function GET() {
    const artworks = await prisma.artwork.findMany({
        orderBy: { createdAt: 'desc' },
        include: { tags: { include: { tag: true } }, user: true },
        select: {
            id: true,
            title: true,
            description: true,
            imageData: true,
            mimeType: true,
            fileSize: true,
            views: true,
            createdAt: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true
                }
            },
            tags: {
                include: {
                    tag: true
                }
            }
        }
    });
    return NextResponse.json(artworks);
}

export async function POST(request: Request) {
    const payload = await request.json();
    const parsed = artworkSchema.safeParse(payload);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { tags, ...data } = parsed.data;
    // TODO: Replace with actual userId from session
    const artwork = await prisma.artwork.create({
        data: {
            ...data,
            userId: 'temp-user-id' // Temporary until auth is fully implemented
        }
    });

    if (tags.length) {
        await prisma.artworkTag.createMany({
            data: tags.map((tagId: string) => ({ artworkId: artwork.id, tagId }))
        });
    }

    return NextResponse.json(artwork, { status: 201 });
}
