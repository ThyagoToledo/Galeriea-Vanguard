import { ArtworkCard } from '@/components/artwork-card';

export type ArtworkSummary = {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    tags: string[];
    downloads: number;
    views: number;
};

type MasonryGridProps = {
    artworks: ArtworkSummary[];
};

export function MasonryGrid({ artworks }: MasonryGridProps) {
    return (
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {artworks.map(artwork => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
        </div>
    );
}
