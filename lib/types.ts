interface PriceOption {
  name: string;
  value: number;
  billingCycle: number;
  billingCycleType: "month" | "year";
}

interface Feature {
  name: string;
  description?: string;
}

interface Button {
  type: "link";
  name: string;
  href: string;
}

interface Tier {
  id: number;
  title: string;
  description: string;
  price?: PriceOption[];
  priceText?: string;
  features: Feature[];
  buttons: Button[];
}
