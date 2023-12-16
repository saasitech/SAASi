import { Database } from "@/supabase/types";
import { createBrowserClient } from "@supabase/ssr";
export type DbClientType = ReturnType<typeof createBrowserClient<Database>>;
export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
