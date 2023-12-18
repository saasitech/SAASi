import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

export default function PricingList({ style }: { style: string }) {
  const pricingItems = [1, 2, 3];
  const Pricing = dynamic(() => import(`@/components/pricing/${style}`));
  return (
    <div>
      <div
        className={cn(
          "space-y-12 lg:space-y-0 lg:grid lg:gap-x-8 gap-y-2 m-auto",
          pricingItems.length === 1 && "max-w-lg",
          pricingItems.length === 2 && "lg:grid-cols-2",
          pricingItems.length === 3 && "lg:grid-cols-3",
          pricingItems.length === 4 && "lg:grid-cols-4",
          pricingItems.length === 5 && "lg:grid-cols-5",
          ""
        )}
      >
        {pricingItems.map(() => (
          <Pricing />
        ))}
      </div>
    </div>
  );
}
