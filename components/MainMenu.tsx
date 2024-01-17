import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import AuthButton from "./AuthButton";

interface Tab {
  name: string;
  href: string;
  current: boolean;
}

export default async function MainMenu() {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let tabs = [] as Tab[];
  tabs = [{ name: "Edit", href: "/edit", current: false }];
  return (
    <div>
      <div className="sm:block">
        <nav className="flex space-x-2 items-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn("btn btn-ghost btn-sm btn-outline")}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </Link>
          ))}

          <AuthButton className="btn btn-ghost btn-sm" />
        </nav>
      </div>
    </div>
  );
}
