'use server';

import { signIn, signOut } from 'auth';

export async function signInServerAction() {
  await signIn('google', { redirectTo: '/' });
}

export async function signOutServerAction() {
  await signOut({ redirectTo: '/' });
}
