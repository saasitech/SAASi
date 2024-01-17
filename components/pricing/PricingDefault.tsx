"use client";
import { usePricingStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import BillingPeriodSwitch from "./BillingPeriodSwitch";
import { CardDefault } from "./CardDefault";
import Header from "./Header";

export default function PricingDefault() {
  const pricingStore = usePricingStore((state) => state);
  const tiers = pricingStore.tiers;

  return (
    <div className="flex-1 flex flex-col space-y-20 max-w-6xl px-3">
      <Header />
      {pricingStore.billingOptions.show ? (
        <div className="m-auto">
          <BillingPeriodSwitch />
        </div>
      ) : (
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent my-8" />
      )}
      <main className="flex-1 flex flex-col gap-6">
        <div
          className={cn(
            "space-y-12 lg:space-y-0 lg:grid lg:gap-x-8 gap-y-2 m-auto",
            tiers.length === 1 && "max-w-lg",
            tiers.length === 2 && "lg:grid-cols-2",
            tiers.length === 3 && "lg:grid-cols-3",
            tiers.length === 4 && "lg:grid-cols-4",
            tiers.length === 5 && "lg:grid-cols-5",
            ""
          )}
        >
          {tiers.map((tier) => (
            <CardDefault key={tier.id} tier={tier} />
          ))}
        </div>
      </main>
    </div>
  );
}
