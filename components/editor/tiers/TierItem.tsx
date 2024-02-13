import type { TierItem as TierItemType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BadgeInput } from "./BadgeInput";
import { CtaButton } from "./CtaButton";
import { DescriptionInput } from "./DescriptionInput";
import Features from "./Features";
import { PriceTypeSelect } from "./PriceTypeSelect";
import { PricingInput } from "./PricingInput";
import { TermsDescriptionInput } from "./TermsIDescriptionInput";
import { TierActions } from "./TierActions";
import { TitleInput } from "./TileInput";

export const TierItem = ({
  tier,
  selectedPricing,
  onSelectedPricing,

  expandTiers,
  onExpandTiers,
}: {
  tier: TierItemType;
  selectedPricing: number;
  onSelectedPricing: (id: number) => void;
  expandTiers: boolean;
  onExpandTiers: (expand: boolean) => void;
}) => {
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();
  const tierId = `tier-${tier.id}`;

  const checkTier = (tier: TierItemType) => {
    const errors: string[] = [];
    if (tier.title === "") {
      errors.push("Title is missing");
    }
    if (tier.cta.href === "" || tier.cta.priceId === "") {
      errors.push("Call to action button is missing href or priceId");
    }
    if (tier.cta.label === "") {
      errors.push("Call to action button is missing label");
    }
    errors.length > 0 ? setError(errors) : setError([]);
  };

  useEffect(() => {
    checkTier(tier);
  }, [tier]);

  return (
    <div
      id={tierId}
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
          onExpandTiers(false);
          onSelectedPricing(selectedPricing === tier.id ? -1 : tier.id);
          router.push(`#${tierId}`);
        }}
      />
      <div className="collapse-title font-bold text-lg text-white flex justify-between items-center">
        <div className="space-x-2">
          <span>{tier.title}</span>
          {error.length > 0 && (
            <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 inline" />
          )}
        </div>
      </div>

      <div className="collapse-content space-y-4 overflow-visible">
        {error.length > 0 && (
          <div className="">
            <span className="text-warning">Missing some inputs:</span>

            <ul>
              {error.map((err, i) => (
                <li key={i} className="space-x-2">
                  <span>-</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
          onSelectedPricing={onSelectedPricing}
        />
      </div>
    </div>
  );
};
