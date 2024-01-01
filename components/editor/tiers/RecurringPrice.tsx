import { TierItem, usePricingStore } from "@/lib/store";

export const RecurringPrice = ({ tier }: { tier: TierItem }) => {
  const pricingStore = usePricingStore((state) => state);
  return (
    <div>
      <label htmlFor="description" className="label-text ">
        Pricing
      </label>
      {Array.isArray(tier.price) &&
        tier.price.map((price, index) => {
          const previousPricing = index === 0 ? null : tier.price[index - 1];
          return (
            <div className="mt-2 relative flex items-center" key={index}>
              <input
                type="text"
                name="project-name"
                id="project-name"
                className="input input-bordered input-saasi !pr-[200px]"
                value={price.value}
                onChange={(e) => {
                  price.value = e.target.value;
                  pricingStore.setTiers(pricingStore.tiers);
                }}
              />
              <div className="absolute right-1 space-x-1">
                <select
                  className="select select-sm max-w-xs"
                  value={price?.billingPeriod}
                  onChange={(e) => {
                    price.billingPeriod = e.target.value as BillingPeriod;
                    pricingStore.setTiers(pricingStore.tiers);
                  }}
                >
                  {["week", "month", "year"]
                    .filter((i) => {
                      return !(
                        previousPricing &&
                        i.includes(previousPricing.billingPeriod)
                      );
                    })
                    .map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                </select>
              </div>
            </div>
          );
        })}
    </div>
  );
};
