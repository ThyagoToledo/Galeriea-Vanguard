import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { Folder, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

type CollectionWithRelations = {
    id: string;
    name: string;
    description: string | null;
    user: { name: string };
    artworks: Array<{ artwork: { imageUrl: string } }>;
};

async function getCollections(): Promise<CollectionWithRelations[]> {
    try {
        const collections = await prisma.collection.findMany({
            where: {
                isPublic: true,
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
                artworks: {
                    include: {
                        artwork: {
                            select: {
                                imageUrl: true,
                            },
                        },
                    },
                    take: 4,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 20,
        });

        return collections as CollectionWithRelations[];
    } catch (error) {
        console.error('Error fetching collections:', error);
        return [];
    }
}

export default async function CollectionsPage() {
    const collections = await getCollections();

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm uppercase tracking-widest text-primary-200">Coleções</p>
                    <h1 className="text-3xl font-semibold">
                        {collections.length > 0
                            ? `${collections.length} coleção${collections.length > 1 ? 'ões' : ''} pública${collections.length > 1 ? 's' : ''}`
                            : 'Coleções públicas'}
                    </h1>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova coleção
                </Button>
            </div>

            {collections.length > 0 ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection) => (
                        <article
                            key={collection.id}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="rounded-full bg-primary-500/20 p-3">
                                    <Folder className="h-6 w-6 text-primary-300" />
                                </div>
                                <span className="text-sm text-white/50">
                                    {collection.artworks.length} obras
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold">{collection.name}</h3>
                            {collection.description && (
                                <p className="mt-2 line-clamp-2 text-sm text-white/70">
                                    {collection.description}
                                </p>
                            )}
                            <p className="mt-4 text-xs text-white/50">
                                Por {collection.user.name}
                            </p>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-16 text-center">
                    <div className="rounded-full bg-primary-500/20 p-6">
                        <Folder className="h-12 w-12 text-primary-300" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">Nenhuma coleção ainda</h2>
                        <p className="mt-2 text-white/70">
                            Crie sua primeira coleção para organizar suas obras favoritas.
                        </p>
                    </div>
                    <Button size="lg">
                        <Plus className="mr-2 h-5 w-5" />
                        Criar primeira coleção
                    </Button>
                </div>
            )}
        </div>
    );
}
