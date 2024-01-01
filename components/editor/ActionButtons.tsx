export const ActionButtons = ({ onClose }) => {
  return (
    <div className="flex flex-shrink-0 justify-end px-4 py-4 space-x-2 bg-base-100">
      <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary btn-sm">
        Save
      </button>
    </div>
  );
};
