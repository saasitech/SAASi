import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";

export const PlainTextPrice = ({ tier }: { tier: TierItem }) => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="description" className="label-text ">
        Price text
      </label>
      <input
        type="text"
        name="price-text"
        className="input input-bordered input-saasi"
        value={tier.price as string}
        placeholder="Contact us"
        onChange={(e) => {
          tier.price = e.target.value as string;
          setTiers(tiers);
        }}
      />
    </div>
  );
};
