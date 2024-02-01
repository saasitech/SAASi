import { createProvider } from "next-zustand";
import { create } from "zustand";
import {
  BillingPeriod,
  Dialog,
  PriceRecurring,
  PriceType,
  Pricing,
  TierFeature,
  TierItem,
  TierPrice,
  Toast,
} from "./types";

export const defaultTheme = "dim";
interface PricingState extends Pricing {
  setDescription: (val: string) => void;
  setTitle: (val: string) => void;
  setTermsUrl: (val: string) => void;
  setShowBillingPeriod: (val: boolean) => void;
  setBillingOptionLabel: (key: BillingPeriod, val: string) => void;
  setBillingPeriod: (val: BillingPeriod) => void;
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
  terms: "",
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

export const { Provider, useStore } = createProvider<PricingState>()(
  (set, get) => ({
    isSynced: false,
    id: 0,
    title: "Pricing",
    description: `Create and test
    multiple strategies to unlock the most optimal pricing for
    your SaaS startup`,

    currency: "USD",
    theme: defaultTheme,
    metadata: {},
    billingOptions: {
      show: true,
      selected: "month",
      labels: {
        week: "Weekly",
        month: "Monthly",
        year: "Yearly",
      },
    },
    tiers,
    termsUrl: "https://saasi.vercel.app/terms",
    setTitle: (val) => set({ title: val }),
    setTermsUrl: (val) => set({ title: val }),
    setDescription: (val) => set({ description: val }),
    setTheme: (val) => set({ theme: val }),
    setCurrency: (val) => set({ currency: val }),
    setShowBillingPeriod: (val) =>
      set({ billingOptions: { ...get().billingOptions, show: val } }),
    setBillingPeriod: (val) =>
      set({ billingOptions: { ...get().billingOptions, selected: val } }),
    setBillingOptionLabel: (key, value) =>
      set({
        billingOptions: {
          ...get().billingOptions,
          labels: { ...get().billingOptions.labels, [key]: value },
        },
      }),
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
      const tiers = [...get().tiers];
      const index = tiers.findIndex((t) => t.id === tier.id);
      tiers[index].priceType = priceType;
      set({ tiers });
    },
    setPrice: (price, tier) => {
      const tiers = [...get().tiers];
      const index = tiers.findIndex((t) => t.id === tier.id);
      tiers[index].price = price;
      set({ tiers });
    },
  })
);

export interface PricingListState {
  isSynced: boolean;
  pricingList: Pricing[];
  setPricingList: (val: Pricing[]) => void;
}

export const usePricingListStore = create<PricingListState>((set, get) => ({
  isSynced: false,
  pricingList: [],
  setPricingList: (val) => set({ pricingList: val }),
}));

interface AppState {
  toast: Toast | null;
  dialog: Dialog | null;
  setToast: (toast: Toast | null, duration?: number) => void;
  setDialog: (dialog: Dialog | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  toast: null,
  dialog: null,
  setToast: (toast, duration = 3000) => {
    set({ toast });
    setTimeout(() => set({ toast: null }), duration);
  },
  setDialog: (dialog) => {
    set({ dialog });
    const el = document.getElementById("appDialog") as any;
    if (dialog) {
      el?.showModal();
    } else {
      el?.close();
    }
  },
}));

export const availableBillingPeriods = [
  "week",
  "month",
  "year",
] as BillingPeriod[];
