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

export type BillingOptionLabels = {
  [key in BillingPeriod]: string;
};
export interface BillingOptions {
  show: boolean;
  selected: BillingPeriod;
  labels: BillingOptionLabels;
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
  terms?: string;
  buttons: { type: "button" | "link"; name: string; href?: string }[];
}

export interface Pricing {
  isSynced: boolean;
  id: number;
  title: string;
  description: string;
  slug?: string;
  currency: string;
  theme: string;
  metadata: object;
  billingOptions: BillingOptions;
  termsUrl?: string;
  tiers: TierItem[];
}

export type ToastType = "success" | "error" | "warning" | "info";
export interface Toast {
  type: ToastType;
  message: string;
}
export interface Dialog {
  type?: ToastType;
  title?: string;
  message?: React.ReactNode | string;
  body?: React.ReactNode | string;
  actions?: React.ReactNode | string;
}
