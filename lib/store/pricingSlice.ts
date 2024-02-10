"use client";
import { StateCreator } from "zustand";
import {
  BillingPeriod,
  PriceRecurring,
  Pricing,
  TierFeature,
  TierItem,
} from "../types";

export const defaultTheme = "dim";

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
export const tiers: TierItem[] = [
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

export const defaultPricingState: Pricing = {
  id: 0,
  title: "Test Pricing",
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
};

export interface PricingSlice extends Pricing {
  setDescription: (val: string) => void;
  setTitle: (val: string) => void;
  setTermsUrl: (val: string) => void;
  setShowBillingPeriod: (val: boolean) => void;
  setBillingOptionLabel: (key: BillingPeriod, val: string) => void;
  setBillingPeriod: (val: BillingPeriod) => void;
  setCurrency: (val: string) => void;
  setTheme: (val: string) => void;
  setTiers: (val: TierItem[]) => void;
}

export const createPricingSlice: StateCreator<
  PricingSlice,
  [],
  [],
  PricingSlice
> = (set) => ({
  ...defaultPricingState,
  setTitle: (val) => set((state) => ({ ...state, title: val })),
  setTermsUrl: (val) => set({ termsUrl: val }),
  setDescription: (val) => set({ description: val }),
  setTheme: (val) => set({ theme: val }),
  setCurrency: (val) => set({ currency: val }),
  setShowBillingPeriod: (val) =>
    set((state) => ({
      billingOptions: { ...state.billingOptions, show: val },
    })),
  setBillingPeriod: (val) =>
    set((state) => ({
      billingOptions: { ...state.billingOptions, selected: val },
    })),
  setBillingOptionLabel: (key, value) =>
    set((state) => ({
      billingOptions: {
        ...state.billingOptions,
        labels: { ...state.billingOptions.labels, [key]: value },
      },
    })),
  setTiers: (newTiers) => {
    set({
      tiers: newTiers.map((t, index) => ({
        ...t,
        id: index,
        features: t.features.map((i, index) => ({ ...i, id: index })),
      })),
    });
  },
});
