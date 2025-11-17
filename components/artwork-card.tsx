import Image from 'next/image';
import { Download, Eye } from 'lucide-react';

export type ArtworkCardProps = {
    artwork: {
        id: string;
        title: string;
        artist: string;
        imageUrl: string;
        tags: string[];
        downloads: number;
        views: number;
    };
};

export function ArtworkCard({ artwork }: ArtworkCardProps) {
    return (
        <figure className="mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-transform active:scale-[0.98] sm:mb-4 sm:rounded-3xl">
            <div className="relative aspect-[3/4]">
                <Image 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>
            <figcaption className="flex flex-col gap-2.5 p-3 sm:gap-3 sm:p-4">
                <div>
                    <p className="text-xs uppercase tracking-widest text-primary-200 sm:text-sm">{artwork.artist}</p>
                    <h3 className="text-base font-semibold sm:text-lg">{artwork.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs text-white/70 sm:gap-2">
                    {artwork.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-full border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
                            #{tag}
                        </span>
                    ))}
                    {artwork.tags.length > 3 && (
                        <span className="rounded-full border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
                            +{artwork.tags.length - 3}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {artwork.views.toLocaleString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {artwork.downloads.toLocaleString('pt-BR')}
                    </span>
                </div>
            </figcaption>
        </figure>
    );
}
