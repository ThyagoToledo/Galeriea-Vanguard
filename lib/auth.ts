import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'voce@galeria.art' },
                password: { label: 'Senha', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) {
                    return null;
                }

                const valid = await bcrypt.compare(credentials.password, user.password);
                if (!valid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.avatar ?? undefined
                };
            }
        })
    ],
    session: { strategy: 'jwt' },
    pages: { signIn: '/login' }
};

export const { handlers: authHandlers, signIn, signOut, auth } = NextAuth(authOptions);
