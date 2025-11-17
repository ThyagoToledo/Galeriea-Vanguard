import { Button } from '@/components/ui/button';
import { UploadModal } from '@/components/upload-modal';
import { prisma } from '@/lib/prisma';
import { ArtworkCard } from '@/components/artwork-card';
import { Upload } from 'lucide-react';

export const dynamic = 'force-dynamic';

type ArtworkSummary = {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    tags: string[];
    downloads: number;
    views: number;
};

async function getArtworks(): Promise<ArtworkSummary[]> {
    try {
        const artworks = await prisma.artwork.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
                tags: {
                    include: {
                        tag: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 50,
        });

        const mapped: ArtworkSummary[] = artworks.map((artwork) => {
            return {
                id: artwork.id,
                title: artwork.title,
                artist: artwork.user.name,
                imageUrl: artwork.imageUrl,
                tags: artwork.tags.map((t) => t.tag.name),
                downloads: 0,
                views: artwork.views,
            };
        });

        return mapped;
    } catch (error) {
        console.error('Error fetching artworks:', error);
        return [];
    }
}

export default async function FeedPage() {
    const artworks = await getArtworks();

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm uppercase tracking-widest text-primary-200">Feed</p>
                    <h1 className="text-3xl font-semibold">
                        {artworks.length > 0
                            ? `${artworks.length} obra${artworks.length > 1 ? 's' : ''} na galeria`
                            : 'Galeria Vanguard'}
                    </h1>
                </div>
                <UploadModal>
                    <Button>Enviar obra</Button>
                </UploadModal>
            </div>

            {artworks.length > 0 ? (
                <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
                    {artworks.map((artwork) => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                </div>
            ) : (
                <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-16 text-center">
                    <div className="rounded-full bg-primary-500/20 p-6">
                        <Upload className="h-12 w-12 text-primary-300" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">Nenhuma obra ainda</h2>
                        <p className="mt-2 text-white/70">
                            Seja o primeiro artista a compartilhar uma criação na Galeria Vanguard.
                        </p>
                    </div>
                    <UploadModal>
                        <Button size="lg">Enviar primeira obra</Button>
                    </UploadModal>
                </div>
            )}
        </div>
    );
}
