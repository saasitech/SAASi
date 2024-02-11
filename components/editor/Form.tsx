"use client";
import { updatePricing } from "@/lib/serverActions/pricingActions";
import { usePricingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import LinkBack from "../common/LinkBack";
import { ActionButtons } from "./ActionButtons";
import { BillingPeriodSwitch } from "./BillingPeriodSwitch";
import { CurrencySelect } from "./CurrencySelect";
import { DescriptionInput } from "./DescriptionInput";
import { EditorHeader } from "./EditorHeader";
import { TermsUrlInput } from "./TermsUrlInput";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceTitleInput } from "./TitleInput";
import { TiersManager } from "./tiers/TiersManager";

export default function Form() {
  const router = useRouter();
  const id = usePricingStore((state) => state.id);
  const slug = usePricingStore((state) => state.slug);
  const title = usePricingStore((state) => state.title);
  const description = usePricingStore((state) => state.description);
  const theme = usePricingStore((state) => state.theme);
  const currency = usePricingStore((state) => state.currency);
  const metadata = usePricingStore((state) => state.metadata);
  const createdAt = usePricingStore((state) => state.createdAt);
  const updatedAt = usePricingStore((state) => state.updatedAt);
  const archivedAt = usePricingStore((state) => state.archivedAt);
  const tiers = usePricingStore((state) => state.tiers);
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const pricingList = usePricingStore((state) => state.pricingList);
  const setPricing = usePricingStore((state) => state.setPricing);
  const setPricingList = usePricingStore((state) => state.setPricingList);
  const setToast = usePricingStore((state) => state.setToast);

  const submitForm = async (e) => {
    e.preventDefault();
    const pricingItem = {
      id,
      slug,
      title,
      description,
      theme,
      currency,
      tiers,
      billingOptions,
      metadata,
      createdAt,
      updatedAt,
      archivedAt,
    };
    try {
      await updatePricing(pricingItem);
      setToast({ message: "Pricing updated", type: "success" });
      pricingList[
        pricingList.findIndex(
          (pricingList) => pricingList.id === pricingItem.id
        )
      ] = pricingItem;
      setPricing(pricingItem);
      setPricingList(pricingList);
    } catch (error) {
      setToast({ message: "Error updating pricing", type: "error" });
      return;
    }
  };
  const closePanel = () => {
    router.push("/");
  };
  return (
    <form
      className="flex h-full flex-col bg-slate-700 shadow-xl"
      onSubmit={submitForm}
    >
      <EditorHeader
        title={<LinkBack href="/admin">{title}</LinkBack>}
        onClose={closePanel}
      />
      <div className="space-y-4 my-2 px-4 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-slate-700 overflow-y-auto">
        <PriceTitleInput />
        <DescriptionInput />
        <TermsUrlInput />
        <ThemeDropdown />
        <BillingPeriodSwitch />
        <CurrencySelect />
        <TiersManager />
      </div>
      <ActionButtons onClose={closePanel} />
    </form>
  );
}
