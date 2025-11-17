import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Testar conexão
        await prisma.$connect();
        
        // Contar tabelas
        const userCount = await prisma.user.count();
        const artworkCount = await prisma.artwork.count();
        const tagCount = await prisma.tag.count();
        
        // Testar criação de usuário temporário
        const testUser = await prisma.user.upsert({
            where: { email: 'test@connection.com' },
            update: {},
            create: {
                email: 'test@connection.com',
                name: 'Test Connection',
                password: 'test-hash'
            }
        });
        
        return NextResponse.json({
            status: 'success',
            message: 'Banco de dados conectado!',
            database: {
                connected: true,
                users: userCount,
                artworks: artworkCount,
                tags: tagCount,
            },
            testUser: {
                id: testUser.id,
                email: testUser.email,
                name: testUser.name
            }
        });
        
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        }, { status: 500 });
    }
}
