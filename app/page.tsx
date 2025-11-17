import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { UploadModal } from '@/components/upload-modal';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <main className="relative px-4 py-6 sm:px-6 sm:py-10">
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-50">
                <Image src="/grid.svg" fill alt="grid" className="object-cover mix-blend-screen" />
            </div>

            <Navbar />

            <section className="mx-auto mt-12 max-w-5xl text-center hero-glow sm:mt-16">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 sm:px-4 sm:py-2 sm:text-sm">
                    Plataforma aberta para artistas independentes
                </p>
                <h1 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl px-4">
                    Compartilhe arte livre, descubra novos estilos e colabore com a comunidade Vanguard.
                </h1>
                <p className="mt-4 text-base text-white/70 sm:mt-6 sm:text-lg px-4">
                    Upload ilimitado, coleções públicas, downloads em alta, estatísticas em tempo real e uma experiência inspirada em galerias modernas.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 sm:mt-10 px-4">
                    <UploadModal>
                        <Button size="lg" className="gap-2 w-full sm:w-auto">
                            Enviar obra agora <ArrowRight className="h-4 w-4" />
                        </Button>
                    </UploadModal>
                    <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                        <Link href="#recursos">Explorar recursos</Link>
                    </Button>
                </div>
            </section>

            <section className="mx-auto mt-16 sm:mt-24 grid max-w-5xl gap-6 sm:gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 text-left md:grid-cols-3" id="recursos">
                {[
                    {
                        title: 'Upload inteligente',
                        description: 'Armazenamento direto no banco de dados PostgreSQL com limite de 5MB por imagem.',
                        badge: 'Database'
                    },
                    {
                        title: 'Descoberta avançada',
                        description: 'Busca semântica, tags customizadas e coleções públicas colaborativas.',
                        badge: 'Discovery'
                    },
                    {
                        title: 'Insights em tempo real',
                        description: 'Painel com visualizações, downloads e engajamento por artista.',
                        badge: 'Analytics'
                    }
                ].map(card => (
                    <article key={card.title} className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
                        <span className="text-xs uppercase tracking-widest text-primary-300">{card.badge}</span>
                        <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-semibold text-white">{card.title}</h3>
                        <p className="mt-2 sm:mt-3 text-sm text-white/70">{card.description}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}
