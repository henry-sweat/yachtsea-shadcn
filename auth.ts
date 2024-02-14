import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import type { NextAuthConfig } from 'next-auth';

export const config = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [GitHub, Google],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
