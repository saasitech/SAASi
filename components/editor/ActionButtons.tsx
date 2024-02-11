import LinkBack from "../common/LinkBack";

export const ActionButtons = ({ onClose }) => {
  return (
    <div className="flex flex-shrink-0 justify-between px-4 py-4 space-x-2 bg-base-100">
      <LinkBack href="/admin">Back</LinkBack>
      <button type="submit" className="btn btn-primary btn-sm">
        Save
      </button>
    </div>
  );
};
