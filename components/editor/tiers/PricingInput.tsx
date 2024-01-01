import { TierItem, usePricingStore } from "@/lib/store";
import { OneOffPrice } from "./OneOffPrice";
import { PlainTextPrice } from "./PlainTextPrice";
import { RecurringPrice } from "./RecurringPrice";

export const PricingInput = ({ tier }: { tier: TierItem }) => {
  usePricingStore((state) => state);
  if (tier.priceType === "one-off") return <OneOffPrice tier={tier} />;
  if (tier.priceType === "recurring") {
    return <RecurringPrice tier={tier} />;
  }
  return <PlainTextPrice tier={tier} />;
};
