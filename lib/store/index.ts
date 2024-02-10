"use client";
import { createContext, useContext } from "react";
import { StoreApi, createStore, useStore as useZustandStore } from "zustand";
import { AppSlice, createAppSlice } from "./appSlice";
import { PricingListSlice, createPricingListSlice } from "./pricingListSlice";
import { PricingSlice, createPricingSlice } from "./pricingSlice";

export type StoreInterface = AppSlice & PricingSlice & PricingListSlice;

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export function initializeStore(preloadedState: Partial<StoreInterface>) {
  return createStore<StoreInterface>((...a) => ({
    ...createAppSlice(...a),
    ...createPricingSlice(...a),
    ...createPricingListSlice(...a),
    ...preloadedState,
  }));
}

export function usePricingStore<T>(selector: (state: StoreInterface) => T) {
  const store = useContext(storeContext);

  if (!store) throw new Error("Store is missing the provider");

  return useZustandStore(store, selector);
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () =>
      usePricingStore((s) => s[k as keyof typeof s]);
  }

  return store;
};

export function usePricingStoreWithSelectors() {
  const store = useContext(storeContext);

  if (!store) throw new Error("Store is missing the provider");

  return createSelectors(store).use;
}
