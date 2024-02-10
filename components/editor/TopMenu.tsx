"use client";

import { useParams } from "next/navigation";

export function TopMenu() {
  const params = useParams<{ slug: string }>();
  return (
    <ul className="bg-base-200/25 menu-horizontal w-full p-4 space-x-2">
      <li>
        <a className="btn btn-sm btn-neutral btn-outline font-normal">
          Active
          <span className="badge badge-sm badge-neutral">99+</span>
        </a>
      </li>
      <li>
        <a className="btn btn-sm btn-ghost font-normal">
          Archived
          <span className="badge badge-sm">99+</span>
        </a>
      </li>
    </ul>
  );
}
