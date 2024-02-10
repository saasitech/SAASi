import { usePricingStore } from "@/lib/store";

export function Dialog({ id }: { id: string }) {
  const dialog = usePricingStore((state) => state.dialog);
  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box p-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {dialog?.title && (
            <h3 className="font-bold text-lg text-black/80 dark:text-white/80 px-4 py-2">
              {dialog?.title}
            </h3>
          )}
          {dialog?.message && (
            <div
              className="px-4 py-2"
              dangerouslySetInnerHTML={{ __html: dialog?.message || "" }}
            />
          )}
          {dialog?.body && <div className="p-4 py-2">{dialog?.body}</div>}
          {dialog?.actions && (
            <div className="modal-action bg-base-300 p-4">
              {dialog?.actions}
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
