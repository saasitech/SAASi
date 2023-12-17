import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { cache } from "react";

export const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createClient(cookieStore);
});
