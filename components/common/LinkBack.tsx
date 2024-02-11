import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LinkBack({
  children,
  href,
  onClick,
}: {
  children?: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center space-x-1">
      <span className="btn btn-circle btn-ghost btn-xs">
        <ChevronLeftIcon className="w-4 h-4" />
      </span>
      {children && <span>{children}</span>}
    </Link>
  );
}
