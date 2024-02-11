import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formattedPrice = (value, currency) => {
  let lang =
    (typeof navigator !== "undefined" && navigator.language) || "en-US";

  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency,
    compactDisplay: "short",
    notation: "compact",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: value?.toString().split(".")[1]?.length || 0,
  }).format(value);
};

export const shortenBillingPeriod = (period: string) => {
  if (period === "month") {
    return "mo";
  }
  if (period === "year") {
    return "yr";
  }
  if (period === "week") {
    return "wk";
  }
  return period;
};

export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(" ");

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};
