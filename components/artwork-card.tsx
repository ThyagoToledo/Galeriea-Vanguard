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
        <figure className="mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg">
            <div className="relative aspect-[3/4]">
                <Image src={artwork.imageUrl} alt={artwork.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
            </div>
            <figcaption className="flex flex-col gap-3 p-4">
                <div>
                    <p className="text-sm uppercase tracking-widest text-primary-200">{artwork.artist}</p>
                    <h3 className="text-lg font-semibold">{artwork.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-white/70">
                    {artwork.tags.map(tag => (
                        <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {artwork.views.toLocaleString('pt-BR')} views
                    </span>
                    <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {artwork.downloads.toLocaleString('pt-BR')} downloads
                    </span>
                </div>
            </figcaption>
        </figure>
    );
}
