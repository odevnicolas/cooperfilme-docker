/* eslint-disable @typescript-eslint/no-explicit-any */
import { authenticate } from '@/core/services/authService';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/',
    error: '/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Usuário', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const res = await authenticate({
            username: credentials?.username as string,
            password: credentials?.password as string,
          });

          if (!res || !res.acess) {
            return null
          }

          return {
            user: {
              ...res,
              token: res.token,
            },
            id: res.acess.id,
            token: res.token,
          };
        } catch (error: any) {
          console.log('==> ', error?.response?.data);
          throw new Error(JSON.stringify(error?.response?.data));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      const data = { ...token, ...user, session }
      return data
    },

    async session({ session, token }) {
      session.user = token.user as never
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: 'jwt', maxAge: 60 * 60 * 4 },
}
