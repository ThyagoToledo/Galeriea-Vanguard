import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 py-16">
            <header className="text-center">
                <p className="text-sm uppercase tracking-widest text-primary-200">Bem-vindo de volta</p>
                <h1 className="mt-2 text-3xl font-semibold">Acesse seu ateliê digital</h1>
                <p className="mt-2 text-white/70">Gerencie obras, coleções e acompanhe estatísticas em tempo real.</p>
            </header>
            <form className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8">
                <label className="text-sm">
                    Email
                    <input type="email" placeholder="voce@arte.com" className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm">
                    Senha
                    <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                </label>
                <Button type="submit" className="w-full">
                    Entrar
                </Button>
            </form>
            <p className="text-center text-sm text-white/60">
                Ainda não tem conta?{' '}
                <Link href="/register" className="text-primary-200 underline">
                    Criar conta
                </Link>
            </p>
        </div>
    );
}
