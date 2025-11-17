import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const headingFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
    title: 'Galeria Vanguard',
    description: 'Plataforma colaborativa para artistas compartilharem obras livres.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" className={`${headingFont.variable} ${bodyFont.variable}`}>
            <body className="bg-slate-950 text-slate-100 antialiased">
                {children}
            </body>
        </html>
    );
}
