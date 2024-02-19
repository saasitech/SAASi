"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectUrl = formData.get("redirectUrl") as string;
  const supabase = createClient();
  const url = new URL(`${origin}/login` || "");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (redirectUrl) {
    url.searchParams.set("redirectUrl", redirectUrl);
  }
  if (error) {
    url.searchParams.set("message", "Could not authenticate user");
    return redirect(url.toString());
  } else {
    return redirect(redirectUrl || "/");
  }
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectUrl = formData.get("redirectUrl") as string;
  const supabase = createClient();
  const url = new URL(`${origin}/login` || "");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (redirectUrl) {
    url.searchParams.set("redirectUrl", redirectUrl);
  }
  if (error) {
    url.searchParams.set("message", "Could not create user");
  } else {
    url.searchParams.set("message", "Check email to continue sign in process");
  }
  return redirect(url.toString());
};
