"use client";
import { updatePricing } from "@/lib/serverActions/pricingActions";
import { useAppStore, usePricingStore } from "@/lib/store";
import { getTheme } from "@/lib/themes";
import { useRouter } from "next/navigation";
import { ActionButtons } from "./ActionButtons";
import { BillingPeriodSwitch } from "./BillingPeriodSwitch";
import { CurrencySelect } from "./CurrencySelect";
import { DescriptionInput } from "./DescriptionInput";
import { EditorHeader } from "./EditorHeader";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceTitleInput } from "./TitleInput";
import { TiersManager } from "./tiers/TiersManager";

const themeStyle = getTheme("dim");

export const PriceEditor = () => {
  const router = useRouter();
  const closePanel = () => {
    router.push("/");
  };
  const pricingStore = usePricingStore((state) => state);
  const setToast = useAppStore((state) => state.setToast);

  return (
    <div
      className="pointer-events-auto max-w-md text-sm text-base-content"
      style={themeStyle}
    >
      <form
        className="flex h-full flex-col bg-slate-700 shadow-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          await updatePricing({
            id: pricingStore.id,
            title: pricingStore.title,
            description: pricingStore.description,
            theme: pricingStore.theme,
            currency: pricingStore.currency,
            tiers: pricingStore.tiers as any,
            billingOptions: pricingStore.billingOptions as any,
          });
          setToast({ message: "Pricing updated", type: "success" });
        }}
      >
        <EditorHeader onClose={closePanel} />
        <div className="space-y-4 my-2 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white overflow-y-auto">
          <PriceTitleInput />
          <DescriptionInput />
          <ThemeDropdown />
          <BillingPeriodSwitch />
          <CurrencySelect />
          <TiersManager />
        </div>
        <ActionButtons onClose={closePanel} />
      </form>
    </div>
  );
};
