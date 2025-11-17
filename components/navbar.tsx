import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur md:px-6">
            <Link href="/" className="flex items-center gap-2 text-base font-semibold md:text-lg">
                <span className="rounded-full bg-primary-500/20 p-1.5 text-primary-300 md:p-2">
                    <Star className="h-4 w-4 md:h-5 md:w-5" />
                </span>
                <span className="hidden sm:inline">Galeria Vanguard</span>
                <span className="sm:hidden">Vanguard</span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
                <Link href="/feed" className="hover:text-white transition-colors">Feed</Link>
                <Link href="#recursos" className="hover:text-white transition-colors">Recursos</Link>
                <Link href="https://github.com/ThyagoToledo/Galeriea-Vanguard" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
                <Button asChild variant="ghost" className="hidden text-white/80 md:inline-flex">
                    <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm" className="text-xs md:text-sm">
                    <Link href="/register">Criar conta</Link>
                </Button>
            </div>
        </header>
    );
}
