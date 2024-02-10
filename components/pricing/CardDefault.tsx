"use client";
import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";
import { Actions } from "./Actions";
import { Description } from "./Description";
import { Features } from "./Features";
import { PriceSection } from "./PriceSection";
import { Title } from "./Title";

export const CardDefault = ({ tier }: { tier: TierItem }) => {
  const currency = usePricingStore((state) => state.currency);
  const template = [
    <Title {...tier} key="title" />,
    <Description {...tier} key="desc" />,
    <PriceSection key="price" tier={tier} currency={currency} />,
    <div key="features" className="flex-1">
      <Features {...tier} />
    </div>,
    <Actions {...tier} key="action" />,
  ];

  return (
    <div className="relative flex">
      {tier.badge && (
        <span className="absolute -top-2 right-4 badge badge-primary">
          {tier.badge}
        </span>
      )}
      <div className="flex flex-col w-full max-w-sm px-6 py-6 space-y-5 bg-base-100 border border-black/10 dark:border-white/10 rounded-lg shadow mx-auto">
        {template.map((Component: any, index) => Component)}
      </div>
    </div>
  );
};
