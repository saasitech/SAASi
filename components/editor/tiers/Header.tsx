import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export const Header = (props) => {
  return (
    <div className="flex justify-between items-center">
      <legend className="text-label">Tiers</legend>
      <div className="dropdown dropdown-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            props.onExpandTiers(!props.expandTiers);
          }}
          className="btn btn-link btn-sm p-0 text-primary"
        >
          {props.expandTiers ? "collapse" : "expand all"}
          {props.expandTiers ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
