import { BillingPeriod, LogoSizes } from "./types";

export const availableBillingPeriods = [
  "week",
  "month",
  "year",
] as BillingPeriod[];

export const logoSizes: LogoSizes = {
  sm: "18px",
  md: "24px",
  lg: "36px",
  xl: "48px",
  "2xl": "64px",
  "3xl": "96px",
  "4xl": "128px",
};
