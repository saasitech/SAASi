import { TierItem, usePricingStore } from "@/lib/store";

export const TitleInput = ({ tier }: { tier: TierItem }) => {
  const pricingStore = usePricingStore((state) => state);
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
            pricingStore.setTiers(pricingStore.tiers);
          }}
        />
      </div>
    </div>
  );
};
