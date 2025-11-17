"use client";

import { type KeyboardEvent, type MouseEvent, type ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type UploadModalProps = {
    children: ReactNode;
};

export function UploadModal({ children }: UploadModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <span
                onClick={() => setOpen(true)}
                role="button"
                tabIndex={0}
                className="inline-flex"
                onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => event.key === 'Enter' && setOpen(true)}
            >
                {children}
            </span>
            {open ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
                    <div
                        className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-6 backdrop-blur"
                        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
                    >
                        <header className="mb-6">
                            <p className="text-sm uppercase tracking-widest text-primary-200">Upload</p>
                            <h3 className="text-2xl font-semibold">Envie sua nova obra</h3>
                            <p className="text-sm text-white/60">Arraste e solte ou descreva a peça que deseja publicar.</p>
                        </header>
                        <form className="flex flex-col gap-4">
                            <label className="flex flex-col gap-1 text-sm">
                                Título
                                <input
                                    type="text"
                                    placeholder="Ex: Colisões Cósmicas"
                                    className={cn('rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40')}
                                />
                            </label>
                            <label className="flex flex-col gap-1 text-sm">
                                Tags
                                <input type="text" placeholder="generativo, futurismo" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
                            </label>
                            <label className="flex flex-col gap-1 text-sm">
                                Upload da imagem
                                <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-white/70">
                                    Arraste um arquivo ou clique aqui
                                </div>
                            </label>
                            <div className="flex items-center justify-end gap-3">
                                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="button">Salvar rascunho</Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
