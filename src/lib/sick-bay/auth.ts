import { supabase } from "./supabase";

export async function getSession() {
  return supabase.auth.getSession();
}

export async function signIn(
  email: string,
  password: string
) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function canReadBody() {
  return supabase.rpc(
    "can_read_domain",
    {
      requested_domain: "body",
    }
  );
}

export async function canWriteBody() {
  return supabase.rpc(
    "can_write_domain",
    {
      requested_domain: "body",
    }
  );
}
