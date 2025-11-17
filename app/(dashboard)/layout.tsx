import { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex min-h-[70vh] max-w-6xl gap-10 py-12">
            <aside className="hidden w-64 flex-shrink-0 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex">
                <p className="text-xs uppercase tracking-widest text-white/50">Painel</p>
                <nav className="flex flex-col gap-2 text-sm text-white/70">
                    <Link href="/feed" className="hover:text-white transition-colors">Feed</Link>
                    <Link href="/upload" className="hover:text-white transition-colors">Upload</Link>
                    <Link href="/collections" className="hover:text-white transition-colors">Coleções</Link>
                    <Link href="/profile" className="hover:text-white transition-colors">Perfil</Link>
                </nav>
            </aside>
            <section className="flex-1">{children}</section>
        </div>
    );
}
