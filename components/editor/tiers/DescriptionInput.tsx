import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";

export const DescriptionInput = ({ tier }: { tier: TierItem }) => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  return (
    <div>
      <label htmlFor="description" className="label-text ">
        Description
      </label>
      <div className="mt-2">
        <textarea
          id="description"
          name="description"
          className="input input-bordered input-saasi min-h-[65px]"
          value={tier.description}
          onChange={(e) => {
            tier.description = e.target.value;
            setTiers(tiers);
          }}
        />
      </div>
    </div>
  );
};
