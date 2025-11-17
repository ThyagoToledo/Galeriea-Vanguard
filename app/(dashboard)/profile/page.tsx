import { Button } from '@/components/ui/button';
import { User as UserIcon, Mail, Calendar, LogOut } from 'lucide-react';

export default function ProfilePage() {
    // TODO: Buscar dados do usuário autenticado
    const user = {
        name: 'Usuário Demo',
        email: 'demo@galeriavanguard.com',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        artworkCount: 0,
        collectionCount: 0,
    };

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm uppercase tracking-widest text-primary-200">Perfil</p>
                <h1 className="text-3xl font-semibold">Minha conta</h1>
            </div>

            <div className="space-y-6">
                {/* Card do perfil */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 rounded-full bg-primary-500/20 p-6">
                            <UserIcon className="h-12 w-12 text-primary-300" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Membro desde {user.createdAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estatísticas */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <p className="text-sm text-white/60">Obras publicadas</p>
                        <p className="mt-2 text-3xl font-semibold">{user.artworkCount}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <p className="text-sm text-white/60">Coleções criadas</p>
                        <p className="mt-2 text-3xl font-semibold">{user.collectionCount}</p>
                    </div>
                </div>

                {/* Configurações */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                    <h3 className="mb-6 text-xl font-semibold">Configurações da conta</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div>
                                <p className="font-medium">Editar perfil</p>
                                <p className="text-sm text-white/60">Altere seu nome, bio e avatar</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Editar
                            </Button>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div>
                                <p className="font-medium">Alterar senha</p>
                                <p className="text-sm text-white/60">Atualize sua senha de acesso</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Alterar
                            </Button>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div>
                                <p className="font-medium">Privacidade</p>
                                <p className="text-sm text-white/60">Gerencie suas preferências de privacidade</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Configurar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Ações perigosas */}
                <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
                    <h3 className="mb-4 text-xl font-semibold text-red-200">Zona de perigo</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-red-200">Sair da conta</p>
                            <p className="text-sm text-red-200/60">Encerrar sua sessão atual</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-red-500/50 text-red-200 hover:bg-red-500/10">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
