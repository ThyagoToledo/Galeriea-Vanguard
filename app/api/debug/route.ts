import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cloudinary } from '@/lib/cloudinary';

export async function GET() {
    const checks = {
        env: {} as Record<string, string>,
        database: { status: 'checking...', error: null as string | null },
        cloudinary: { status: 'checking...', error: null as string | null }
    };

    // 1. Verificar variáveis de ambiente
    const envVars = [
        'POSTGRES_PRISMA_URL',
        'POSTGRES_URL_NON_POOLING',
        'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET',
        'NEXTAUTH_SECRET'
    ];

    for (const varName of envVars) {
        const value = process.env[varName];
        if (!value || value.includes('COLE_AQUI')) {
            checks.env[varName] = '❌ Não configurado';
        } else {
            checks.env[varName] = varName.includes('SECRET') 
                ? '✅ Configurado (oculto)' 
                : `✅ ${value.substring(0, 30)}...`;
        }
    }

    // 2. Testar conexão com banco
    try {
        await prisma.$connect();
        const userCount = await prisma.user.count();
        const artworkCount = await prisma.artwork.count();
        checks.database.status = `✅ Conectado (${userCount} users, ${artworkCount} artworks)`;
        await prisma.$disconnect();
    } catch (error: any) {
        checks.database.status = '❌ Erro de conexão';
        checks.database.error = error.message;
    }

    // 3. Testar Cloudinary
    try {
        const config = cloudinary.config();
        if (!config.api_key || !config.api_secret || !config.cloud_name) {
            checks.cloudinary.status = '❌ Credenciais não configuradas';
            checks.cloudinary.error = 'Verifique CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET e NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME';
        } else {
            checks.cloudinary.status = `✅ Configurado (cloud: ${config.cloud_name})`;
        }
    } catch (error: any) {
        checks.cloudinary.status = '❌ Erro de configuração';
        checks.cloudinary.error = error.message;
    }

    return NextResponse.json(checks, { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
