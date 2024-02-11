"use client";

import { StateCreator } from "zustand";
import { Pricing } from "../types";

export interface PricingListSlice {
  pricingList: Pricing[];
  setPricingList: (val: Pricing[]) => void;
}

export const createPricingListSlice: StateCreator<
  PricingListSlice,
  [],
  [],
  PricingListSlice
> = (set) => ({
  pricingList: [],
  setPricingList: (val) => set({ pricingList: val }),
});
