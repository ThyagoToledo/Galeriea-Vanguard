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
        <div className="w-full max-w-3xl">
            <div className="mb-6 sm:mb-8">
                <p className="text-xs uppercase tracking-widest text-primary-200 sm:text-sm">Perfil</p>
                <h1 className="text-2xl font-semibold sm:text-3xl">Minha conta</h1>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {/* Card do perfil */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl sm:p-8">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                        <div className="flex-shrink-0 rounded-full bg-primary-500/20 p-4 sm:p-6">
                            <UserIcon className="h-8 w-8 text-primary-300 sm:h-12 sm:w-12" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold sm:text-2xl">{user.name}</h2>
                            <div className="mt-3 flex flex-col gap-2 text-sm text-white/70 sm:mt-4">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span className="break-all">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Membro desde {user.createdAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estatísticas */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:rounded-2xl sm:p-6">
                        <p className="text-xs text-white/60 sm:text-sm">Obras publicadas</p>
                        <p className="mt-2 text-2xl font-semibold sm:text-3xl">{user.artworkCount}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:rounded-2xl sm:p-6">
                        <p className="text-xs text-white/60 sm:text-sm">Coleções criadas</p>
                        <p className="mt-2 text-2xl font-semibold sm:text-3xl">{user.collectionCount}</p>
                    </div>
                </div>

                {/* Configurações */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl sm:p-8">
                    <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">Configurações da conta</h3>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl">
                            <div>
                                <p className="text-sm font-medium sm:text-base">Editar perfil</p>
                                <p className="text-xs text-white/60 sm:text-sm">Altere seu nome, bio e avatar</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                Editar
                            </Button>
                        </div>
                        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl">
                            <div>
                                <p className="text-sm font-medium sm:text-base">Alterar senha</p>
                                <p className="text-xs text-white/60 sm:text-sm">Atualize sua senha de acesso</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                Alterar
                            </Button>
                        </div>
                        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl">
                            <div>
                                <p className="text-sm font-medium sm:text-base">Privacidade</p>
                                <p className="text-xs text-white/60 sm:text-sm">Gerencie suas preferências de privacidade</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                Configurar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Ações perigosas */}
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 sm:rounded-3xl sm:p-8">
                    <h3 className="mb-3 text-lg font-semibold text-red-200 sm:mb-4 sm:text-xl">Zona de perigo</h3>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-red-200 sm:text-base">Sair da conta</p>
                            <p className="text-xs text-red-200/60 sm:text-sm">Encerrar sua sessão atual</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full border-red-500/50 text-red-200 hover:bg-red-500/10 sm:w-auto">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
