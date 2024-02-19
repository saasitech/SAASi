"use server";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton({
  className,
}: {
  className?: string;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <button className={cn("py-2 px-4 no-underline", className)}>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className={cn("py-2 px-4 no-underline flex", className)}
    >
      Login
    </Link>
  );
}
