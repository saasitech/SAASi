import { usePricingStore } from "@/lib/store";
import { tierDefault } from "@/lib/store/pricingSlice";
import { TierItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BadgeInput } from "./BadgeInput";
import { CtaButton } from "./CtaButton";
import { DescriptionInput } from "./DescriptionInput";
import Features from "./Features";
import { Header } from "./Header";
import { PriceTypeSelect } from "./PriceTypeSelect";
import { PricingInput } from "./PricingInput";
import { TermsDescriptionInput } from "./TermsIDescriptionInput";
import { TierActions } from "./TierActions";
import { TitleInput } from "./TileInput";

export const TiersManager = () => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  const [expandTiers, setExpandTiers] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState(tiers[0].id);

  return (
    <div className="space-y-2">
      <Header expandTiers={expandTiers} onExpand={setExpandTiers} />
      {tiers.length > 0 && (
        <div className="join join-vertical w-full">
          {tiers.map((tier) => {
            return (
              <div
                key={tier.id}
                className={cn(
                  "collapse collapse-arrow join-item border border-base-300 bg-base-100 bg-opacity-30",
                  expandTiers && "collapse-open"
                )}
              >
                <input
                  type="checkbox"
                  name="tiers-accordion"
                  checked={selectedPricing === tier.id}
                  onChange={() => {
                    setExpandTiers(false);
                    setSelectedPricing(
                      selectedPricing === tier.id ? -1 : tier.id
                    );
                  }}
                />
                <div className="collapse-title font-bold text-lg text-white flex justify-between items-center">
                  <span>{tier.title}</span>
                </div>
                <div className="collapse-content space-y-4 overflow-visible">
                  <TitleInput tier={tier} />
                  <DescriptionInput tier={tier} />
                  <BadgeInput tier={tier} />
                  <PriceTypeSelect tier={tier} />
                  <PricingInput tier={tier} />
                  <Features tier={tier} />
                  <CtaButton tier={tier} />
                  <TermsDescriptionInput tier={tier} />
                  <TierActions
                    tier={tier}
                    selectedPricing={selectedPricing}
                    setSelectedPricing={setSelectedPricing}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tiers.length < 4 && (
        <button
          className="btn btn-ghost w-full text-primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const newTier: TierItem = {
              ...tierDefault,
              id: tiers.length,
            };
            setTiers([...tiers, newTier]);
            setSelectedPricing(newTier.id);
          }}
        >
          Add Tier <PlusCircleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
