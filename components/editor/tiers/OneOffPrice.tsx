import { usePricingStore } from "@/lib/store";
import { PriceOneOff, TierItem } from "@/lib/types";

export const OneOffPrice = ({ tier }: { tier: TierItem }) => {
  const pricingStore = usePricingStore((state) => state);
  let price: PriceOneOff = {
    text: tier.price?.["text"] || "",
    value: tier.price?.["value"] || "",
  };
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="description" className="label-text ">
        Amount
      </label>
      <input
        type="text"
        name="price-text"
        className="input input-bordered input-saasi"
        value={price.value}
        placeholder="0"
        onChange={(e) => {
          (price.value = Number(e.target.value)), (tier.price = price);
          pricingStore.setTiers(pricingStore.tiers);
        }}
      />
      <label htmlFor="description" className="label-text ">
        Price text
      </label>
      <input
        type="text"
        name="price-text"
        className="input input-bordered input-saasi"
        value={price.text}
        placeholder="/seat"
        onChange={(e) => {
          (price.text = e.target.value), (tier.price = price);
          pricingStore.setTiers(pricingStore.tiers);
        }}
      />
    </div>
  );
};
