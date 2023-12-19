import { cn } from "@/lib/utils";
import Default from "./Default";

const pricingItemStyles = {
  default: Default,
};

export interface PricingItem {
  id: string;
  title: string;
  price: string;
}

export default function PricingList({ style }: { style: string }) {
  const pricingItems = [
    {
      id: "basic",
      title: "Basic",
      price: "19",
    },
    {
      id: "pro",
      title: "Pro",
      price: "39",
    },
    {
      id: "enterprise",
      title: "Enterprise",
      price: "99",
    },
  ];

  const Pricing = pricingItemStyles[style] || pricingItemStyles.default;
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
        {pricingItems.map((item) => (
          <Pricing key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
