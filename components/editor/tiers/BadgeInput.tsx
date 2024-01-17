import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";

export const BadgeInput = ({ tier }: { tier: TierItem }) => {
  const pricingStore = usePricingStore((state) => state);
  return (
    <div>
      <label htmlFor="badge" className="label-text ">
        Badge
      </label>
      <div className="mt-2">
        <input
          id="badge"
          name="badge"
          className="input input-bordered input-saasi"
          value={tier.badge}
          onChange={(e) => {
            tier.badge = e.target.value;
            pricingStore.setTiers(pricingStore.tiers);
          }}
        />
      </div>
    </div>
  );
};
