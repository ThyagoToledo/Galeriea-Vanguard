import { MasonryGrid } from '@/components/masonry-grid';
import { Button } from '@/components/ui/button';

const mockFeed = Array.from({ length: 6 }).map((_, index) => ({
    id: `feed-${index}`,
    title: `Nova obra #${index + 1}`,
    artist: index % 2 === 0 ? 'Isa Monteiro' : 'Leo Duarte',
    imageUrl: `https://images.unsplash.com/photo-15${index}09052183-83fb62c96c07?auto=format&fit=crop&w=600&q=80`,
    tags: ['minimal', 'surreal'],
    downloads: 80 + index * 8,
    views: 400 + index * 25
}));

export default function FeedPage() {
    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm uppercase tracking-widest text-primary-200">Feed</p>
                    <h1 className="text-3xl font-semibold">Inspirando 12.400 artistas esta semana</h1>
                </div>
                <Button>Novo filtro</Button>
            </div>
            <MasonryGrid artworks={mockFeed} />
        </div>
    );
}
