import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const createServerClient = cache((cookieStore) => {
  return createClient(cookieStore);
});
