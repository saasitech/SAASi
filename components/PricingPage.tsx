"use client";
import Default from "@/components/pricing/PricingDefault";
import { usePricingStore } from "@/lib/store";
import { getTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import Toast from "./Toast";

const pricingStyles = {
  default: Default,
};

const Pricing = pricingStyles.default;

export const PricingPage = () => {
  const pricingStore = usePricingStore((state) => state);
  const styleProps = getTheme(pricingStore.theme);
  return (
    <div
      style={styleProps}
      className={cn(
        styleProps["colorScheme"],
        "bg-base-300 flex-1 h-screen overflow-y-auto relative"
      )}
      data-theme={pricingStore.theme}
    >
      <Toast />
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center h-16">
          <div className="w-full max-w-6xl flex justify-between items-center p-3 text-sm">
            <div className="flex">
              {/* <Link href={`/`} className="btn btn-ghost btn-sm">
                <ArrowLongLeftIcon className="w-5 h-5" /> Back
              </Link> */}
            </div>
          </div>
        </nav>
        <Pricing />
        <footer></footer>
      </div>
    </div>
  );
};
