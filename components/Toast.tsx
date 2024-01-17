"use client";
import { useAppStore } from "@/lib/store";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Toast() {
  const toast = useAppStore((state) => state.toast);
  const setToast = useAppStore((state) => state.setToast);
  if (!toast) return null;
  return (
    <div className="toast toast-top toast-center absolute">
      <div className="alert alert-info p-4 py-2">
        <span>{toast?.message}</span>
        <button
          className="btn btn-circle btn-sm btn-neutral"
          onClick={() => setToast(null)}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
