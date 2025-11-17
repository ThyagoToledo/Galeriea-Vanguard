import Link from 'next/link';
import { Menu, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <span className="rounded-full bg-primary-500/20 p-2 text-primary-300">
                    <Star className="h-5 w-5" />
                </span>
                Galeria Vanguard
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
                <Link href="#galeria">Galeria</Link>
                <Link href="#recursos">Recursos</Link>
                <Link href="/roadmap">Roadmap</Link>
                <Link href="/docs">Docs API</Link>
            </nav>

            <div className="flex items-center gap-3">
                <Button variant="ghost" className="hidden text-white/80 md:inline-flex">
                    Entrar
                </Button>
                <Button>
                    Criar conta
                </Button>
                <Button variant="ghost" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}
