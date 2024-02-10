import { TierItem } from "@/lib/types";
import { OneOffPrice } from "./OneOffPrice";
import { PlainTextPrice } from "./PlainTextPrice";
import { RecurringPrice } from "./RecurringPrice";

export const PricingInput = ({ tier }: { tier: TierItem }) => {
  if (tier.priceType === "one-off") return <OneOffPrice tier={tier} />;
  if (tier.priceType === "recurring") {
    return <RecurringPrice tier={tier} />;
  }
  return <PlainTextPrice tier={tier} />;
};
