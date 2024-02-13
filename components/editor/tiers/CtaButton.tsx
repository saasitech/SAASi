import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";

export const CtaButton = ({ tier }: { tier: TierItem }) => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="project-name" className="label-text">
          Call to action button
        </label>
        <div className="flex items-center space-x-4">
          <label className="label-text flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="checkout"
              checked={tier.cta.type === "checkout"}
              className="radio radio-sm radio-primary"
              onChange={(e) => {
                tier.cta.type = "checkout";
                setTiers(tiers);
              }}
            />
            <span className="label-text">Checkout</span>
          </label>
          <label className="label-text flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="link"
              checked={tier.cta.type === "link"}
              className="radio radio-sm radio-primary"
              onChange={(e) => {
                tier.cta.type = "link";
                setTiers(tiers);
              }}
            />
            <span className="label-text">Link</span>
          </label>
        </div>
      </div>
      {tier.cta.type === "checkout" && (
        <div className="space-y-2">
          <label htmlFor="project-name" className="label-text">
            Stripe priceId
          </label>
          <input
            type="text"
            name="priceId"
            placeholder="e.g. price_"
            className="input input-bordered input-saasi"
            value={tier.cta.priceId}
            onChange={(e) => {
              tier.cta.priceId = e.target.value;
              setTiers(tiers);
            }}
          />
        </div>
      )}
      {tier.cta.type === "link" && (
        <div className="space-y-2">
          <label htmlFor="project-name" className="label-text">
            Link URL
          </label>
          <input
            type="text"
            name="href"
            className="input input-bordered input-saasi"
            value={tier.cta.href}
            onChange={(e) => {
              tier.cta.href = e.target.value;
              setTiers(tiers);
            }}
          />
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="project-name" className="label-text">
          Button label
        </label>
        <input
          type="text"
          name="label"
          className="input input-bordered input-saasi"
          placeholder="e.g. Subscribe"
          value={tier.cta.label}
          onChange={(e) => {
            tier.cta.label = e.target.value;
            setTiers(tiers);
          }}
        />
      </div>
    </div>
  );
};
