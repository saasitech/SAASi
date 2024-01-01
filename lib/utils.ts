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
