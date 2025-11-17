import { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex min-h-[70vh] max-w-6xl gap-10 py-12">
            <aside className="hidden w-64 flex-shrink-0 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex">
                <p className="text-xs uppercase tracking-widest text-white/50">Painel</p>
                <nav className="flex flex-col gap-2 text-sm text-white/70">
                    <Link href="/dashboard/feed">Feed</Link>
                    <Link href="/dashboard/upload">Upload</Link>
                    <Link href="/dashboard/collections">Coleções</Link>
                    <Link href="/dashboard/profile">Perfil</Link>
                </nav>
            </aside>
            <section className="flex-1">{children}</section>
        </div>
    );
}
