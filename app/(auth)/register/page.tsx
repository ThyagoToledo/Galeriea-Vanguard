'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError('As senhas não conferem');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Erro ao criar conta');
            } else {
                router.push('/login?registered=true');
            }
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col justify-center gap-4 px-4 py-12 sm:gap-6 sm:py-16">
            <header className="text-center">
                <p className="text-xs uppercase tracking-widest text-primary-200 sm:text-sm">Comece a criar</p>
                <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Cadastre-se na comunidade Vanguard</h1>
                <p className="mt-2 text-sm text-white/70 sm:text-base">Ganhe seu perfil público, coleções customizadas e métricas em tempo real.</p>
            </header>
            <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl sm:p-8 md:grid-cols-2">
                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200 md:col-span-2">
                        {error}
                    </div>
                )}
                <label className="text-sm md:col-span-2">
                    Nome completo
                    <input
                        type="text"
                        name="name"
                        placeholder="Ava Mendes"
                        required
                        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base"
                    />
                </label>
                <label className="text-sm md:col-span-2">
                    Email profissional
                    <input
                        type="email"
                        name="email"
                        placeholder="you@galeria.art"
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
                        minLength={6}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base"
                    />
                </label>
                <label className="text-sm">
                    Confirme a senha
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base"
                    />
                </label>
                <Button type="submit" className="md:col-span-2" size="lg" disabled={loading}>
                    {loading ? 'Criando conta...' : 'Criar conta gratuita'}
                </Button>
            </form>
            <p className="text-center text-sm text-white/60">
                Já é membro?{' '}
                <Link href="/login" className="text-primary-200 underline hover:text-primary-100">
                    Entrar
                </Link>
            </p>
        </div>
    );
}
