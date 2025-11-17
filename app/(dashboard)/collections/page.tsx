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
        <div className="w-full">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                    <p className="text-xs uppercase tracking-widest text-primary-200 sm:text-sm">Coleções</p>
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        {collections.length > 0
                            ? `${collections.length} coleção${collections.length > 1 ? 'ões' : ''} pública${collections.length > 1 ? 's' : ''}`
                            : 'Coleções públicas'}
                    </h1>
                </div>
                <Button size="sm" className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova coleção
                </Button>
            </div>

            {collections.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {collections.map((collection) => (
                        <article
                            key={collection.id}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all active:scale-[0.98] sm:p-6 sm:hover:bg-white/10"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="rounded-full bg-primary-500/20 p-2.5 sm:p-3">
                                    <Folder className="h-5 w-5 text-primary-300 sm:h-6 sm:w-6" />
                                </div>
                                <span className="text-xs text-white/50 sm:text-sm">
                                    {collection.artworks.length} obras
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold sm:text-xl">{collection.name}</h3>
                            {collection.description && (
                                <p className="mt-2 line-clamp-2 text-sm text-white/70">
                                    {collection.description}
                                </p>
                            )}
                            <p className="mt-3 text-xs text-white/50 sm:mt-4">
                                Por {collection.user.name}
                            </p>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center sm:mt-16 sm:gap-6 sm:rounded-3xl sm:p-16">
                    <div className="rounded-full bg-primary-500/20 p-4 sm:p-6">
                        <Folder className="h-8 w-8 text-primary-300 sm:h-12 sm:w-12" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold sm:text-2xl">Nenhuma coleção ainda</h2>
                        <p className="mt-2 text-sm text-white/70 sm:text-base">
                            Crie sua primeira coleção para organizar suas obras favoritas.
                        </p>
                    </div>
                    <Button size="lg" className="w-full sm:w-auto">
                        <Plus className="mr-2 h-5 w-5" />
                        Criar primeira coleção
                    </Button>
                </div>
            )}
        </div>
    );
}
