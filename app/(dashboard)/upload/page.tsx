'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload as UploadIcon, X } from 'lucide-react';
import Image from 'next/image';

export default function UploadPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith('image/')) {
                setError('Por favor, selecione apenas arquivos de imagem');
                return;
            }
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('Arquivo muito grande. Tamanho máximo: 10MB');
                return;
            }
            setFile(selectedFile);
            setError('');
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!file) {
            setError('Selecione uma imagem');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // TODO: Implementar upload real para Cloudinary
            // Por enquanto, apenas simulando
            await new Promise((resolve) => setTimeout(resolve, 1500));

            router.push('/feed');
            router.refresh();
        } catch (err) {
            setError('Erro ao fazer upload. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    function clearFile() {
        setFile(null);
        setPreview(null);
    }

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm uppercase tracking-widest text-primary-200">Upload</p>
                <h1 className="text-3xl font-semibold">Compartilhe sua arte</h1>
                <p className="mt-2 text-white/70">
                    Envie suas obras e compartilhe com a comunidade Vanguard
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                    {!preview ? (
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-16 transition-colors hover:border-primary-500/50 hover:bg-white/10">
                            <div className="rounded-full bg-primary-500/20 p-6">
                                <UploadIcon className="h-12 w-12 text-primary-300" />
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold">Clique para selecionar uma imagem</p>
                                <p className="mt-1 text-sm text-white/60">
                                    PNG, JPG, GIF até 10MB
                                </p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={clearFile}
                                className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 backdrop-blur transition-colors hover:bg-black/80"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
                    <label className="block text-sm">
                        Título da obra *
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nome da sua criação"
                            required
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus:border-primary-500 focus:outline-none"
                        />
                    </label>

                    <label className="block text-sm">
                        Descrição
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Conte sobre sua obra, técnicas usadas, inspirações..."
                            rows={4}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus:border-primary-500 focus:outline-none"
                        />
                    </label>

                    <label className="block text-sm">
                        Tags (separadas por vírgula)
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="digital, abstrato, colorido"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus:border-primary-500 focus:outline-none"
                        />
                    </label>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="submit"
                        disabled={loading || !file || !title}
                        className="flex-1"
                        size="lg"
                    >
                        {loading ? 'Enviando...' : 'Publicar obra'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={loading}
                        size="lg"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}
