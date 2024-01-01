"use client";
import { getTheme, themes } from "@/lib/themes";

export const ThemeCard = ({ theme }) => {
  const styleProps = getTheme(theme);
  return (
    <div className="border-[1px] border-base-content border-opacity-10 overflow-hidden rounded-lg ">
      <div data-theme={theme} style={styleProps}>
        <div className="grid grid-cols-5 grid-rows-3">
          <div className="bg-base-200 col-start-1 row-span-2 row-start-1" />
          <div className="bg-base-300 col-start-1 row-start-3" />
          <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
            <div className="font-bold text-left capitalize">{theme}</div>
            <div className="flex flex-wrap gap-1">
              <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                <div className="text-primary-content text-sm font-bold">A</div>
              </div>
              <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                <div className="text-secondary-content text-sm font-bold">
                  A
                </div>
              </div>
              <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                <div className="text-accent-content text-sm font-bold">A</div>
              </div>
              <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                <div className="text-neutral-content text-sm font-bold">A</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThemeSwitch({
  onSelect,
}: {
  onSelect?: (theme: string) => void;
}) {
  const changeTheme = (theme: string) => {
    onSelect && onSelect(theme);
  };
  return (
    <div className="h-[200px] w-[180px] overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-white pr-2 grid grid-cols-1 pb-[30px]">
      {Object.entries(themes).map(([theme]) => {
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              changeTheme(theme);
            }}
            key={theme}
            className=""
          >
            <ThemeCard theme={theme} />
          </button>
        );
      })}
    </div>
  );
}
