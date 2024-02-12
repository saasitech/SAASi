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
  cta: {
    type: "checkout" | "link";
    label: string;
    href?: string;
    priceId?: string;
  };
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

export interface Pricing {
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
  isDefault?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date | null;
  archivedAt: string | Date | null;
}
