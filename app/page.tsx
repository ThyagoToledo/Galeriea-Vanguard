import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { UploadModal } from '@/components/upload-modal';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <main className="relative px-6 py-10 sm:px-10">
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-50">
                <Image src="/grid.svg" fill alt="grid" className="object-cover mix-blend-screen" />
            </div>

            <Navbar />

            <section className="mx-auto mt-16 max-w-5xl text-center hero-glow">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                    Plataforma aberta para artistas independentes
                </p>
                <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                    Compartilhe arte livre, descubra novos estilos e colabore com a comunidade Vanguard.
                </h1>
                <p className="mt-6 text-lg text-white/70">
                    Upload ilimitado, coleções públicas, downloads em alta, estatísticas em tempo real e uma experiência inspirada em galerias modernas.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <UploadModal>
                        <Button size="lg" className="gap-2">
                            Enviar obra agora <ArrowRight className="h-4 w-4" />
                        </Button>
                    </UploadModal>
                    <Button asChild variant="ghost">
                        <Link href="#recursos">Explorar recursos</Link>
                    </Button>
                </div>
            </section>

            <section className="mx-auto mt-24 grid max-w-5xl gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 text-left md:grid-cols-3" id="recursos">
                {[
                    {
                        title: 'Upload inteligente',
                        description: 'Validação local, otimização automática e armazenamento seguro no Cloudinary.',
                        badge: 'Cloud-native'
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
                    <article key={card.title} className="rounded-2xl border border-white/10 bg-black/30 p-6">
                        <span className="text-xs uppercase tracking-widest text-primary-300">{card.badge}</span>
                        <h3 className="mt-4 text-2xl font-semibold text-white">{card.title}</h3>
                        <p className="mt-3 text-sm text-white/70">{card.description}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}
