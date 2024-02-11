import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
export const EditorHeader = ({
  title,
  description,
  onClose,
}: {
  title: string | React.ReactNode;
  description?: string;
  onClose: () => void;
}) => {
  return (
    <div className="px-4 py-2 bg-base-100 text-base-content">
      <div className="flex items-center justify-between">
        <div className="font-semibold leading-6">{title}</div>
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="relative rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={onClose}
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-1">
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  );
};
