import { create } from "zustand";
import { defaultTheme } from "./themes";

export type TierFeature = {
  id: number;
  name: string;
  included: boolean;
};
export type BillingPeriod = "week" | "month" | "year";
export type PriceType = "recurring" | "one-off" | "plain text";
export interface BillingCycle {
  period: BillingPeriod;
  value: number | string;
}
export type PriceRecurring = {
  value: number | string;
  billingCycle: number;
  billingPeriod: BillingPeriod;
};
export type PriceText = string;
export type PriceOneOff = { text: string; value: number };
export type TierPrice = PriceRecurring[] | PriceText | PriceOneOff;

export interface TierItem {
  id: number;
  title: string;
  badge: string;
  description: string;
  price: PriceRecurring[] | PriceText | PriceOneOff;
  priceType: PriceType;
  showPriceAsText?: boolean;
  features: TierFeature[];
  buttons: { type: "button" | "link"; name: string; href?: string }[];
}

export interface Pricing {
  title: string;
  description: string;
  slug?: string;
  showBillingCycle: boolean;
  currency: string;
  theme: string;
  tiers: TierItem[];
}

interface PricingState extends Pricing {
  setDescription: (val: string) => void;
  setTitle: (val: string) => void;
  setShowBillingCycle: (val: boolean) => void;
  setCurrency: (val: string) => void;
  setTheme: (val: string) => void;
  setTiers: (val: TierItem[]) => TierItem[];
  setTierFeatures: (tier: TierItem, features: TierFeature[]) => void;
  setPriceType: (priceType: PriceType, tier: TierItem) => void;
  setPrice: (price: TierPrice, tier: TierItem) => void;
}

export const featuresDefault: TierFeature[] = [
  { id: 0, name: "feature 1", included: true },
  { id: 1, name: "feature 2", included: false },
];
export const priceDefault: PriceRecurring = {
  value: 0,
  billingCycle: 1,
  billingPeriod: "month",
};
export const tierDefault: TierItem = {
  id: 1,
  title: "New Tier",
  badge: "",
  description: "Example description",
  priceType: "plain text",
  price: "Contact us",
  features: featuresDefault,
  buttons: [{ type: "link", name: "Choose plan", href: "/#" }],
};

const tiers: TierItem[] = [
  {
    id: 0,
    title: "Basic",
    badge: "",
    description: "For small teams or office",
    price: [
      {
        value: 19.99,
        billingCycle: 1,
        billingPeriod: "month",
      },
      { value: 199, billingCycle: 1, billingPeriod: "year" },
    ],
    priceType: "recurring",
    features: [
      { id: 0, name: "2 team members", included: true },
      { id: 1, name: "20GB Cloud storage", included: true },
      { id: 2, name: "Integration help", included: true },
      { id: 3, name: "Sketch Files", included: false },
      { id: 4, name: "API Access", included: false },
      { id: 5, name: "Complete documentation", included: false },
      { id: 6, name: "24×7 phone & email support", included: false },
    ],
    buttons: [{ type: "link", name: "Choose plan", href: "/#" }],
  },
  {
    id: 1,
    title: "Pro",
    badge: "Popular",
    description: "For professional teams",
    price: [
      {
        value: 19,
        billingCycle: 1,
        billingPeriod: "month",
      },
      { value: 199, billingCycle: 1, billingPeriod: "year" },
    ],
    priceType: "recurring",
    features: [
      { id: 0, name: "2 team members", included: true },
      { id: 1, name: "20GB Cloud storage", included: true },
      { id: 2, name: "Integration help", included: true },
      { id: 3, name: "Sketch Files", included: true },
      { id: 4, name: "API Access", included: true },
      { id: 5, name: "Complete documentation", included: false },
      { id: 6, name: "24×7 phone & email support", included: false },
    ],
    buttons: [{ type: "link", name: "Choose plan", href: "/#" }],
  },
  {
    id: 2,
    title: "Enterprise",
    badge: "",
    description: "For enterprise business",
    price: "Contact us",
    priceType: "plain text",
    showPriceAsText: true,
    features: [
      { id: 0, name: "2 team members", included: true },
      { id: 1, name: "20GB Cloud storage", included: true },
      { id: 2, name: "Integration help", included: true },
      { id: 3, name: "Sketch Files", included: true },
      { id: 4, name: "API Access", included: true },
      { id: 5, name: "Complete documentation", included: true },
      { id: 6, name: "24×7 phone & email support", included: true },
    ],
    buttons: [{ type: "link", name: "Choose plan", href: "/#" }],
  },
];

export const usePricingStore = create<PricingState>((set, get) => ({
  title: "Pricing",
  description: `Create and test
    multiple strategies to unlock the most optimal pricing for
    your SaaS startup`,
  showBillingCycle: true,
  currency: "USD",
  theme: defaultTheme,
  tiers,
  setTitle: (val) => set({ title: val }),
  setDescription: (val) => set({ description: val }),
  setTheme: (val) => set({ theme: val }),
  setCurrency: (val) => set({ currency: val }),
  setShowBillingCycle: (val) => set({ showBillingCycle: val }),
  setTiers: (newTiers) => {
    set({
      tiers: newTiers.map((t, index) => ({
        ...t,
        id: index,
        features: t.features.map((i, index) => ({ ...i, id: index })),
      })),
    });
    return get().tiers;
  },
  setTierFeatures: (tier, features) => {
    tier.features = [...features];
    set({ tiers });
  },
  setPriceType: (priceType, tier) => {
    const tiers = [...usePricingStore.getState().tiers];
    const index = tiers.findIndex((t) => t.id === tier.id);
    tiers[index].priceType = priceType;
    set({ tiers });
  },
  setPrice: (price, tier) => {
    const tiers = [...usePricingStore.getState().tiers];
    const index = tiers.findIndex((t) => t.id === tier.id);
    tiers[index].price = price;
    set({ tiers });
  },
}));
