"use client";
import { useStoreSync } from "@/components/useStoreSync";
import { usePricingStore } from "@/lib/store";

export default function SyncStore({ state }) {
  useStoreSync(usePricingStore, state)();
  return null;
}
