import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center gap-6 py-16">
            <header className="text-center">
                <p className="text-sm uppercase tracking-widest text-primary-200">Comece a criar</p>
                <h1 className="mt-2 text-3xl font-semibold">Cadastre-se na comunidade Vanguard</h1>
                <p className="mt-2 text-white/70">Ganhe seu perfil público, coleções customizadas e métricas em tempo real.</p>
            </header>
            <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2">
                <label className="text-sm">
                    Nome completo
                    <input type="text" placeholder="Ava Mendes" className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm">
                    Nome artístico
                    <input type="text" placeholder="@avamendes" className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm md:col-span-2">
                    Email profissional
                    <input type="email" placeholder="you@galeria.art" className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm">
                    Senha
                    <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                </label>
                <label className="text-sm">
                    Confirme a senha
                    <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                </label>
                <Button type="submit" className="md:col-span-2">
                    Criar conta gratuita
                </Button>
            </form>
            <p className="text-center text-sm text-white/60">
                Já é membro?{' '}
                <Link href="/login" className="text-primary-200 underline">
                    Entrar
                </Link>
            </p>
        </div>
    );
}
