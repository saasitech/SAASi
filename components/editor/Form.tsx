"use client";
import {
  createPricing,
  updatePricing,
} from "@/lib/serverActions/pricingActions";
import { usePricingStore } from "@/lib/store";
import { LinkBack } from "../common/LinkBack";
import { ActionButtons } from "./ActionButtons";
import { BillingPeriodSwitch } from "./BillingPeriodSwitch";
import { CurrencySelect } from "./CurrencySelect";
import { DefaultPricingToggle } from "./DefaultPricingToggle";
import { DescriptionInput } from "./DescriptionInput";
import { EditorHeader } from "./EditorHeader";
import { TermsUrlInput } from "./TermsUrlInput";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceTitleInput } from "./TitleInput";
import { TierList } from "./tiers/TierList";

export default function Form() {
  const id = usePricingStore((state) => state.id);
  const slug = usePricingStore((state) => state.slug);
  const title = usePricingStore((state) => state.title);
  const description = usePricingStore((state) => state.description);
  const theme = usePricingStore((state) => state.theme);
  const currency = usePricingStore((state) => state.currency);
  const termsUrl = usePricingStore((state) => state.termsUrl);
  const metadata = usePricingStore((state) => state.metadata);
  const createdAt = usePricingStore((state) => state.createdAt);
  const updatedAt = usePricingStore((state) => state.updatedAt);
  const archivedAt = usePricingStore((state) => state.archivedAt);
  const tiers = usePricingStore((state) => state.tiers);
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const branding = usePricingStore((state) => state.branding);
  const isDefault = usePricingStore((state) => state.isDefault);
  const setPricing = usePricingStore((state) => state.setPricing);
  const setToast = usePricingStore((state) => state.setToast);

  const submitForm = async (e) => {
    e.preventDefault();
    const pricingItem = {
      id,
      slug,
      title,
      description,
      isDefault,
      theme,
      currency,
      tiers,
      billingOptions,
      branding,
      metadata,
      termsUrl,
      createdAt,
      updatedAt,
      archivedAt,
    };
    try {
      const result =
        slug === "new"
          ? await createPricing(pricingItem)
          : await updatePricing(pricingItem);
      setPricing(result as any);
      setToast({
        message: slug === "new" ? "Pricing created" : "Pricing updated",
        type: "success",
      });
    } catch (error) {
      setToast({
        message:
          slug === "new"
            ? "Error creating new pricing"
            : "Error updating pricing",
        type: "error",
      });
      return;
    }
  };

  return (
    <form
      className="flex h-full flex-col bg-slate-700 shadow-xl"
      onSubmit={submitForm}
    >
      <EditorHeader title={<LinkBack href="/admin">{title}</LinkBack>} />
      <div className="space-y-4 my-2 px-4 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-slate-700 overflow-y-auto">
        <PriceTitleInput />
        <DescriptionInput />
        <TermsUrlInput />
        <DefaultPricingToggle />
        <ThemeDropdown />
        <BillingPeriodSwitch />
        <CurrencySelect />
        <TierList />
      </div>
      <ActionButtons />
    </form>
  );
}
