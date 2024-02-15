import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export function TierActions({
  tier,
  selectedPricing,
  onSelectedPricing,
}: {
  tier: TierItem;
  selectedPricing: number;
  onSelectedPricing: (id: number) => void;
}) {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  return (
    tiers.length > 1 && (
      <div className="flex justify-between">
        <button
          type="button"
          className="hover:link link-error"
          onClick={(e) => {
            e.preventDefault();
            const newTiers = [...tiers.filter((t) => t.id !== tier.id)];
            setTiers(newTiers);
            onSelectedPricing(newTiers[0].id);
          }}
        >
          Delete {tier.title}
        </button>
        {tiers.length < 4 && (
          <button
            type="button"
            className="hover:link flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              const newTier: TierItem = {
                ...tier,
                id: tiers.length,
                title: `${tier.title} copy`,
              };
              setTiers([...tiers, newTier]);
              onSelectedPricing(newTier.id);
            }}
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
            Duplicate
          </button>
        )}
      </div>
    )
  );
}
