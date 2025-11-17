'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Upload, FolderHeart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/feed', label: 'Feed', icon: Home },
        { href: '/upload', label: 'Upload', icon: Upload },
        { href: '/collections', label: 'Coleções', icon: FolderHeart },
        { href: '/profile', label: 'Perfil', icon: User },
    ];

    return (
        <>
            <div className="mx-auto flex min-h-screen max-w-6xl gap-6 py-4 px-3 pb-20 md:gap-10 md:py-12 md:px-4 md:pb-12">
                {/* Sidebar Desktop */}
                <aside className="hidden w-64 flex-shrink-0 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex sticky top-4 h-fit">
                    <p className="text-xs uppercase tracking-widest text-white/50">Painel</p>
                    <nav className="flex flex-col gap-2 text-sm text-white/70">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                                        isActive
                                            ? 'bg-primary-500/20 text-primary-300 font-medium'
                                            : 'hover:bg-white/5 hover:text-white'
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>
                
                <section className="flex-1 min-w-0">{children}</section>
            </div>

            {/* Bottom Navigation Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-xl md:hidden safe-area-inset-bottom">
                <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all min-w-[60px]',
                                    isActive
                                        ? 'text-primary-300'
                                        : 'text-white/60 active:text-white/80 active:scale-95'
                                )}
                            >
                                <Icon className={cn('h-5 w-5', isActive && 'fill-primary-300/20')} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
