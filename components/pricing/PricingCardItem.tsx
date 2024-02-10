import { TierItem } from "@/lib/types";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";

export default function PricingCardItem({ tier }: { tier: TierItem }) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm w-full">
      <div className="flex-1 relative inline-flex items-center gap-x-1.5 rounded-l-md bg-base-300/50 px-3 py-2 text-sm text-primary focus:z-10">
        <CurrencyDollarIcon
          className="-ml-0.5 h-5 w-5 text-primary"
          aria-hidden="true"
        />
        {tier.title}
      </div>
      <div className="relative -ml-px inline-flex items-center bg-base-300/50 px-3 py-2 text-sm text-white/70 focus:z-10">
        $12.99/mo
      </div>
      <div className="relative -ml-px inline-flex items-center rounded-r-md bg-base-300/50 px-3 py-2 text-sm text-white/80 focus:z-10">
        $129<span className=" text-white/50">/yr</span>
      </div>
    </span>
  );
}
