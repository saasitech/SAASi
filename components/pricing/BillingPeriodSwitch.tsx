import { usePricingStore } from "@/lib/store";
import { PriceRecurring } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function BillingPeriodSwitch() {
  const tiers = usePricingStore((state) => state.tiers);
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const setBillingPeriod = usePricingStore((state) => state.setBillingPeriod);
  const selected = billingOptions.selected;
  const recurringPricing =
    tiers
      .filter((tier) => tier.priceType === "recurring")
      .map((tier) =>
        (tier.price as PriceRecurring[]).map((price) => price.billingPeriod)
      )
      .sort((tier) => tier.length)[0] || [];

  let translateX = "translate-x-0";
  if (recurringPricing.length === 2) {
    if (recurringPricing.indexOf(selected) === 0) {
      translateX = "translate-x-0";
    } else {
      translateX = "translate-x-full";
    }
  }
  if (recurringPricing.length === 3) {
    if (recurringPricing.indexOf(selected) === 0) {
      translateX = "translate-x-0";
    } else if (recurringPricing.indexOf(selected) === 1) {
      translateX = "translate-x-[100%]";
    } else {
      translateX = "translate-x-[200%]";
    }
  }

  return (
    <div
      className={cn(
        "relative bg-base-300 text-sm text-base-content leading-none border-2 border-base-100 border-black/10 dark:border-white/10 rounded-full grid",
        recurringPricing.length === 1 && "grid-cols-1",
        recurringPricing.length === 2 && "grid-cols-2",
        recurringPricing.length === 3 && "grid-cols-3"
      )}
    >
      <div
        className={cn(
          "absolute z-0 bg-base-100 bg-opacity-100 h-full transition-all duration-200 rounded-full",
          recurringPricing.length === 1 && "w-full",
          recurringPricing.length === 2 && "w-1/2",
          recurringPricing.length === 3 && "w-1/3",
          translateX
        )}
      ></div>

      {recurringPricing.map((period) => (
        <button
          key={period}
          className={cn(
            "relative z-10 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2 ",
            selected === period && "text-secondary"
          )}
          id="grid"
          onClick={() => setBillingPeriod(period)}
        >
          <span className="flex-1">{billingOptions.labels[period]}</span>
        </button>
      ))}
    </div>
  );
}
