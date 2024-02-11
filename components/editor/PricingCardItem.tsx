import { usePricingStore } from "@/lib/store";
import { PriceOneOff, PriceRecurring, TierItem } from "@/lib/types";
import { formattedPrice, shortenBillingPeriod } from "@/lib/utils";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { CreditCardIcon, HashtagIcon } from "@heroicons/react/24/outline";

export default function PricingCardItem({ tier }: { tier: TierItem }) {
  const currency = usePricingStore((state) => state.currency);
  return (
    <div className="isolate inline-flex rounded-md shadow-sm w-full bg-base-300/50">
      <div className="flex-1 relative inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 text-xs text-primary focus:z-10">
        {tier.priceType === "recurring" && (
          <CurrencyDollarIcon
            className="-ml-0.5 h-5 w-5 text-primary"
            aria-hidden="true"
          />
        )}
        {tier.priceType === "one-off" && (
          <CreditCardIcon
            className="-ml-0.5 h-5 w-5 text-primary"
            aria-hidden="true"
          />
        )}
        {tier.priceType === "plain text" && (
          <HashtagIcon
            className="-ml-0.5 h-5 w-5 text-primary"
            aria-hidden="true"
          />
        )}
        {tier.title}
      </div>

      {tier.priceType === "plain text" && (
        <span className="relative -ml-px inline-flex items-center px-3 py-2 text-xs text-white/70 focus:z-10 text-right">
          {tier.price as string}
        </span>
      )}
      {tier.priceType === "one-off" && (
        <span className="relative -ml-px inline-flex items-center px-3 py-2 text-xs text-white/70 focus:z-10 text-right">
          <span className="">
            {formattedPrice((tier.price as PriceOneOff).value, currency)}
          </span>
          <span className="ms-1 text-secondary">
            {(tier.price as PriceOneOff).text}
          </span>
        </span>
      )}
      {tier.priceType === "recurring" && (
        <div className="flex flex-wrap items-end">
          {(tier.price as PriceRecurring[]).map((price) => (
            <div
              key={price.value}
              className="relative -ml-px inline-flex items-center justify-end px-3 py-2 text-xs text-white/70 focus:z-10 min-w-[90px]"
            >
              {formattedPrice(price.value, currency)}
              <span className="ms-1 text-secondary">
                /{shortenBillingPeriod(price.billingPeriod)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
