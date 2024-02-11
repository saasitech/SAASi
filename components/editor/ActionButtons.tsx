import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const ActionButtons = ({ onClose }) => {
  return (
    <div className="flex flex-shrink-0 justify-between px-4 py-4 space-x-2 bg-base-100">
      <Link href="/admin" className="btn btn-ghost btn-sm" onClick={onClose}>
        <ChevronLeftIcon className="w-5 h-5" /> Back to Pricing
      </Link>
      <button type="submit" className="btn btn-primary btn-sm">
        Save
      </button>
    </div>
  );
};
