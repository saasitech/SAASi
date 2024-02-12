"use client";

import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function TopMenu({
  activeCount,
  archivedCount,
}: {
  activeCount: number;
  archivedCount: number;
}) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "active";

  return (
    <div className="flex items-center bg-base-200/25 p-4 pr-2.5">
      <ul className="menu-horizontal w-full space-x-2">
        <li>
          <Link
            href="/admin?status=active"
            className={cn(
              "btn btn-sm btn-ghost font-normal",
              status === "active" && "btn-outline"
            )}
          >
            Active
            <span className="badge badge-sm badge-neutral">{activeCount}</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin?status=archived"
            className={cn(
              "btn btn-sm btn-ghost font-normal",
              status === "archived" && "btn-outline"
            )}
          >
            Archived
            <span className="badge badge-sm">{archivedCount}</span>
          </Link>
        </li>
      </ul>
      <Link
        className="rounded-full hover:bg-base-100 p-1 btn-smt"
        href={"/admin/new"}
      >
        <PlusCircleIcon className="w-7 h-7 text-primary" />
      </Link>
    </div>
  );
}
