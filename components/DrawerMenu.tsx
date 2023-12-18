import { createServerClient } from "@/lib/supabaseServer";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import AuthButton from "./AuthButton";
import ThemeSwitch from "./ThemeSwitch";

interface Tab {
  name: string;
  href: string;
  current: boolean;
}

export default async function MainMenu() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let tabs = [] as Tab[];
  if (user) {
    tabs = [{ name: "My Pricing", href: "/my-pricing", current: false }];
  }
  return (
    <div>
      <div className="sm:block">
        <nav className="flex space-x-2 items-center" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={cn("btn btn-ghost btn-sm")}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </a>
          ))}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              Theme
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[200px]"
            >
              <ThemeSwitch />
            </div>
          </div>
          <AuthButton />
        </nav>
      </div>
    </div>
  );
}
