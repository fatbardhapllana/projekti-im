import { supabase } from './supabase';

export async function krijoLlogari(email: string, fjalekalimi: string) {
  const { error } = await supabase.auth.signUp({ email, password: fjalekalimi });
  if (error) throw new Error(error.message);
}

export async function hyr(email: string, fjalekalimi: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password: fjalekalimi });
  if (error) throw new Error(error.message);
}

export async function dil() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
