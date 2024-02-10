import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";

export const TitleInput = ({ tier }: { tier: TierItem }) => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  return (
    <div>
      <label htmlFor="project-name" className="label-text">
        Tier name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="project-name"
          id="project-name"
          className="input input-bordered input-saasi"
          value={tier.title}
          onChange={(e) => {
            tier.title = e.target.value;
            setTiers(tiers);
          }}
        />
      </div>
    </div>
  );
};
