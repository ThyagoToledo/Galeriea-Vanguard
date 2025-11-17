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
        <div className="w-full">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                    <p className="text-xs uppercase tracking-widest text-primary-200 sm:text-sm">Feed</p>
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        {artworks.length > 0
                            ? `${artworks.length} obra${artworks.length > 1 ? 's' : ''} na galeria`
                            : 'Galeria Vanguard'}
                    </h1>
                </div>
                <UploadModal>
                    <Button size="sm" className="sm:size-default">Enviar obra</Button>
                </UploadModal>
            </div>

            {artworks.length > 0 ? (
                <div className="mt-6 columns-1 gap-4 sm:mt-10 sm:columns-2 sm:gap-6 lg:columns-3 xl:columns-4">
                    {artworks.map((artwork) => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                </div>
            ) : (
                <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center sm:mt-16 sm:gap-6 sm:rounded-3xl sm:p-16">
                    <div className="rounded-full bg-primary-500/20 p-4 sm:p-6">
                        <Upload className="h-8 w-8 text-primary-300 sm:h-12 sm:w-12" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold sm:text-2xl">Nenhuma obra ainda</h2>
                        <p className="mt-2 text-sm text-white/70 sm:text-base">
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
