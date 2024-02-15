import RadioGroup from "@/components/common/RadioGroup";
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
          <RadioGroup
            onChange={(value) => {
              tier.cta.type = value;
              setTiers(tiers);
            }}
            value={tier.cta.type}
            options={[
              { label: "Checkout", value: "checkout" },
              { label: "Link", value: "link" },
            ]}
          />
        </div>
      </div>
      {tier.cta.type === "link" && (
        <div className="space-y-2">
          <label htmlFor="project-name" className="label-text">
            Link URL
          </label>
          <input
            type="text"
            name="href"
            className="input input-bordered input-saasi"
            defaultValue={tier.cta.href}
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
          defaultValue={tier.cta.label}
          onChange={(e) => {
            tier.cta.label = e.target.value;
            setTiers(tiers);
          }}
        />
      </div>
    </div>
  );
};
