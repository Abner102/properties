import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabaseClient = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    })
  : null;

export function hasSupabaseAuth() {
  return !!supabaseClient;
}

export function getSupabaseClient() {
  if (!supabaseClient) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set to use Supabase auth.");
  }
  return supabaseClient;
}

export async function signInWithSupabase(email: string, password: string) {
  const client = getSupabaseClient();
  return client.auth.signInWithPassword({ email, password });
}
