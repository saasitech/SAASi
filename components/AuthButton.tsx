import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton({
  className,
}: {
  className?: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
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
