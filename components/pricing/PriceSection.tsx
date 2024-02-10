import { usePricingStore } from "@/lib/store";
import { PriceOneOff, PriceRecurring, PriceText, TierItem } from "@/lib/types";
import { formattedPrice } from "@/lib/utils";
import { useMemo } from "react";

export const PriceSection = ({
  tier,
  currency,
}: {
  tier: TierItem;
  currency: string;
}) => {
  const tiers = usePricingStore((state) => state.tiers);
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const priceText = tier.price as PriceText;
  const priceOneOff = tier.price as PriceOneOff;
  const priceRecurring = useMemo(() => {
    const prices = tier.price as PriceRecurring[];
    let price = prices[0];
    if (Array.isArray(prices)) {
      const foundPrice = (tier.price as PriceRecurring[]).find(
        (p) => p.billingPeriod === billingOptions.selected
      );
      if (foundPrice) {
        price = foundPrice;
      }
    }
    return price;
  }, [tier.price, billingOptions.selected, tier.priceType]);

  return (
    <div className="flex items-center text-black/80 dark:text-white/80 min-h-[50px]">
      {tier.priceType === "plain text" && (
        <span className="text-4xl font-extrabold tracking-tight">
          {priceText}
        </span>
      )}
      {tier.priceType === "one-off" && (
        <div className="flex flex-wrap items-end">
          <span className="text-4xl font-extrabold tracking-tight">
            {formattedPrice(priceOneOff?.value, currency)}
          </span>
          <span className="ms-1 text-xl font-normal text-secondary">
            {priceOneOff.text}
          </span>
        </div>
      )}
      {tier.priceType === "recurring" && (
        <div className="flex flex-wrap items-end">
          <span className="text-4xl font-extrabold tracking-tight">
            {formattedPrice(priceRecurring?.value, currency)}
          </span>
          <span className="ms-1 text-xl font-normal text-secondary">
            /{priceRecurring?.billingPeriod}
          </span>
        </div>
      )}
    </div>
  );
};
