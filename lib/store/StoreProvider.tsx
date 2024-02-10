"use client";

import { useRef, type PropsWithChildren } from "react";
import type { StoreInterface, StoreType } from "./";
import { Provider, initializeStore } from "./";

type StoreProvider = PropsWithChildren<Partial<StoreInterface>>;

export function StoreProvider({ children, ...props }: StoreProvider) {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
}
