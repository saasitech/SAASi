import { usePricingStore } from "@/lib/store";
import { PriceRecurring, PriceType, TierItem } from "@/lib/types";

export const PriceTypeSelect = ({ tier }: { tier: TierItem }) => {
  const pricingStore = usePricingStore((state) => state);
  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer p-0">
          <span className="label-text">Pricing type</span>
          <select
            className="select select-sm max-w-xs"
            value={tier.priceType}
            onChange={(e) => {
              tier.priceType = e.target.value as PriceType;
              if (tier.priceType === "recurring") {
                tier.price = [
                  {
                    value: 0,
                    billingPeriod: "month",
                    billingCycle: 1,
                  },
                ] as PriceRecurring[];
              } else if (tier.priceType === "one-off") {
                tier.price = {
                  value: 0,
                  text: "/seat",
                };
              } else {
                tier.price = "Contact us";
              }
              pricingStore.setTiers(pricingStore.tiers);
            }}
          >
            {["recurring", "one-off", "plain text"].map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
