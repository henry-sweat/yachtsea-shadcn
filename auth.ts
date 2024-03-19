import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';

import type { NextAuthConfig } from 'next-auth';

export const config = {
  providers: [Google],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
