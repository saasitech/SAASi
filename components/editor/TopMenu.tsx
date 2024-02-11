"use client";

import { cn } from "@/lib/utils";
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
    <ul className="bg-base-200/25 menu-horizontal w-full p-4 space-x-2">
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
  );
}
