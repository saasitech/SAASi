import { usePricingStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Logo from "../common/Logo";

export const ThemeItem = ({
  theme,
  styleProps,
  interactive,
  onColorPick,
  onBrandDetailsPick,
}) => {
  const branding = usePricingStore((state) => state.branding);
  return (
    <div
      data-theme={theme}
      style={styleProps}
      className="rounded-lg overflow-visible"
    >
      <div className="grid grid-cols-5 grid-rows-3">
        <div className="bg-base-100 col-start-1 row-start-1 rounded-tl-lg" />
        <div className="bg-base-200 col-start-1 row-start-2" />
        <div className="bg-base-300 col-start-1 row-start-3 rounded-bl-lg" />
        <div
          className={cn(
            "bg-base-100 col-span-2 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2",
            interactive ? "col-span-2" : "col-span-4"
          )}
        >
          <div className="font-bold text-left capitalize">{theme}</div>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              className="text-primary-content text-sm font-bold bg-primary flex aspect-square w-8 items-center justify-center rounded tooltip"
              onClick={onColorPick("primary")}
              data-tip={interactive ? "Primary" : null}
            >
              P
            </button>
            <button
              type="button"
              className="text-secondary-content text-sm font-bold bg-secondary flex aspect-square w-8 items-center justify-center rounded tooltip"
              onClick={onColorPick("secondary")}
              data-tip={interactive ? "Secondary" : null}
            >
              S
            </button>
            <button
              type="button"
              className="text-accent-content text-sm font-bold bg-accent flex aspect-square w-8 items-center justify-center rounded tooltip"
              onClick={onColorPick("accent")}
              data-tip={interactive ? "Accent" : null}
            >
              A
            </button>
            <button
              type="button"
              className="text-neutral-content text-sm font-bold bg-neutral flex aspect-square w-8 items-center justify-center rounded tooltip"
              onClick={onColorPick("neutral")}
              data-tip={interactive ? "Neutral" : null}
            >
              N
            </button>
          </div>
        </div>
        {interactive && (
          <div className="col-span-2 row-span-3 flex gap-1 px-2 py-0 justify-end items-center mr-2 ">
            <button
              type="button"
              className={cn(
                "btn btn-square tooltip tooltip-neutral tooltip-top-left flex items-center p-1 h-auto w-auto rounded-xl max-w-[100px]",
                branding.logoUrl ? "btn-ghost" : ""
              )}
              data-tip="Company logo and details"
              onClick={onBrandDetailsPick}
            >
              {branding.logoUrl ? (
                <Logo
                  src={branding.logoUrl}
                  alt="logo"
                  className="w-auto min"
                  size="xl"
                />
              ) : (
                <PhotoIcon
                  className="w-6 h-6"
                  data-tip="Your company details"
                />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
