"use client";
import { usePricingStore } from "@/lib/store";
import { tierDefault } from "@/lib/store/pricingSlice";
import { TierItem as TierItemType } from "@/lib/types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { TierItem } from "./TierItem";

export const TierList = () => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  const [expandTiers, setExpandTiers] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<number>(tiers[0].id);

  useEffect(() => {
    const tierId = window.location.hash
      ? Number(window.location.hash?.split("-")[1])
      : tiers[0].id;
    setSelectedPricing(tierId);
  }, []);

  return (
    <div className="space-y-2">
      <Header
        expandTiers={expandTiers}
        onExpandTiers={(val) => setExpandTiers(val)}
      />
      {tiers.length > 0 && (
        <div className="join join-vertical w-full">
          {tiers.map((tier) => (
            <TierItem
              key={tier.id}
              tier={tier}
              selectedPricing={selectedPricing}
              onSelectedPricing={setSelectedPricing}
              expandTiers={expandTiers}
              onExpandTiers={(val) => setExpandTiers(val)}
            />
          ))}
        </div>
      )}
      {tiers.length < 4 && (
        <button
          type="button"
          className="btn btn-ghost w-full text-primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const newTier: TierItemType = {
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
