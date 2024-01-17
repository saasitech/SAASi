import { usePricingStore } from "@/lib/store";
import { PriceOneOff, PriceRecurring, PriceText, TierItem } from "@/lib/types";
import { formattedPrice } from "@/lib/utils";
import { useMemo } from "react";

export const PriceSection = ({
  item,
  currency,
}: {
  item: TierItem;
  currency: string;
}) => {
  const pricingStore = usePricingStore((state) => state);
  const priceText = item.price as PriceText;
  const priceOneOff = item.price as PriceOneOff;
  const priceRecurring = useMemo(() => {
    const prices = item.price as PriceRecurring[];
    let price = prices[0];
    if (Array.isArray(prices)) {
      const foundPrice = (item.price as PriceRecurring[]).find(
        (p) => p.billingPeriod === pricingStore.billingOptions.selected
      );
      if (foundPrice) {
        price = foundPrice;
      }
    }
    return price;
  }, [pricingStore]);

  return (
    <div className="flex items-center text-black/80 dark:text-white/80 min-h-[50px]">
      {item.priceType === "plain text" && (
        <span className="text-4xl font-extrabold tracking-tight">
          {priceText}
        </span>
      )}
      {item.priceType === "one-off" && (
        <div className="flex flex-wrap items-end">
          <span className="text-4xl font-extrabold tracking-tight">
            {formattedPrice(priceOneOff?.value, currency)}
          </span>
          <span className="ms-1 text-xl font-normal text-secondary">
            {priceOneOff.text}
          </span>
        </div>
      )}
      {item.priceType === "recurring" && (
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
