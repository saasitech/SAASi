import { usePricingStore } from "@/lib/store";
import { themes } from "@/lib/themes";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ThemeCard } from "./ThemeCard";

export const ThemeDropdown = () => {
  const theme = usePricingStore((state) => state.theme);
  const setTheme = usePricingStore((state) => state.setTheme);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="label-text">Branding and colors</h3>

        <details className="dropdown dropdown-end">
          <summary className="btn btn-link btn-sm p-0 text-primary">
            change
            <ChevronDownIcon className="w-4 h-4" />
          </summary>
          <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box -mt-1 -mr-1">
            <div className="h-[250px] w-[220px] overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-white grid grid-cols-1 pb-[30px]">
              {Object.entries(themes).map(([theme]) => {
                return (
                  <div
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setTheme(theme);
                    }}
                    key={theme}
                    className=""
                  >
                    <ThemeCard theme={theme} interactive={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </details>
      </div>
      <ThemeCard theme={theme} />
    </div>
  );
};
