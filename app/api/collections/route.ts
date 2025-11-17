import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    const collections = await prisma.collection.findMany({
        where: { isPublic: true },
        include: {
            artworks: {
                take: 3,
                include: { artwork: true }
            }
        }
    });

    return NextResponse.json(collections);
}
