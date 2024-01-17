import { tierDefault, usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  DocumentDuplicateIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { BadgeInput } from "./BadgeInput";
import { DescriptionInput } from "./DescriptionInput";
import Features from "./Features";
import { Header } from "./Header";
import { PriceTypeSelect } from "./PriceTypeSelect";
import { PricingInput } from "./PricingInput";
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
                  type="radio"
                  name="my-accordion-4"
                  checked={selectedPricing === tier.id}
                  onChange={() => {
                    setExpandTiers(false);
                    setSelectedPricing(tier.id);
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
                  {tiers.length > 1 && (
                    <div className="flex justify-between">
                      <button
                        className="hover:link link-error"
                        onClick={(e) => {
                          e.preventDefault();
                          const newTiers = [
                            ...tiers.filter((t) => t.id !== tier.id),
                          ];
                          setTiers(newTiers);
                          setSelectedPricing(newTiers[0].id);
                        }}
                      >
                        Delete
                      </button>
                      {tiers.length < 4 && (
                        <button
                          className="hover:link flex items-center space-x-2"
                          onClick={(e) => {
                            e.preventDefault();
                            const newTier: TierItem = {
                              ...tier,
                              id: tiers.length,
                              title: `${tier.title} copy`,
                            };
                            setTiers([...tiers, newTier]);
                            setSelectedPricing(newTier.id);
                          }}
                        >
                          <DocumentDuplicateIcon className="h-5 w-5" />
                          Duplicate
                        </button>
                      )}
                    </div>
                  )}
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
