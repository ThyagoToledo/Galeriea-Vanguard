import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

// Validar URL do banco
if (!process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_PRISMA_URL.includes('COLE_AQUI')) {
    console.warn('⚠️  POSTGRES_PRISMA_URL não configurado');
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ 
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'query'] : ['error', 'warn']
});

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
