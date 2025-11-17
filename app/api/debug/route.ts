import { NextResponse } from 'next/server';

export async function GET() {
    const config = {
        nextauthUrl: process.env.NEXTAUTH_URL,
        nextauthSecretExists: !!process.env.NEXTAUTH_SECRET,
        nodeEnv: process.env.NODE_ENV,
        vercel: process.env.VERCEL,
        postgresExists: !!process.env.POSTGRES_PRISMA_URL,
    };

    return NextResponse.json(config);
}
