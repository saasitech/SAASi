"use client";

import { StateCreator } from "zustand";
import { Pricing } from "../types";

export interface PricingListSlice {
  pricingList: Pricing[];
  setList: (val: Pricing[]) => void;
}

export const createPricingListSlice: StateCreator<
  PricingListSlice,
  [],
  [],
  PricingListSlice
> = (set) => ({
  pricingList: [],
  setList: (val) => set({ pricingList: val }),
});
