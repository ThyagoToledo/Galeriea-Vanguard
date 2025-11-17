'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Email ou senha incorretos');
            } else {
                router.push('/feed');
                router.refresh();
            }
        } catch (err) {
            setError('Erro ao fazer login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center gap-4 px-4 py-12 sm:gap-6 sm:py-16">
            <header className="text-center">
                <p className="text-xs uppercase tracking-widest text-primary-200 sm:text-sm">Bem-vindo de volta</p>
                <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Acesse seu ateliê digital</h1>
                <p className="mt-2 text-sm text-white/70 sm:text-base">Gerencie obras, coleções e acompanhe estatísticas em tempo real.</p>
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl sm:p-8">
                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {error}
                    </div>
                )}
                <label className="text-sm">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="voce@arte.com"
                        required
                        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base"
                    />
                </label>
                <label className="text-sm">
                    Senha
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base"
                    />
                </label>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
            <p className="text-center text-sm text-white/60">
                Ainda não tem conta?{' '}
                <Link href="/register" className="text-primary-200 underline hover:text-primary-100">
                    Criar conta
                </Link>
            </p>
        </div>
    );
}
