"use client";
import { updatePricing } from "@/lib/serverActions/pricingActions";
import { usePricingStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
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
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const id = usePricingStore((state) => state.id);
  const title = usePricingStore((state) => state.title);
  const description = usePricingStore((state) => state.description);
  const theme = usePricingStore((state) => state.theme);
  const currency = usePricingStore((state) => state.currency);
  const tiers = usePricingStore((state) => state.tiers);
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const setToast = usePricingStore((state) => state.setToast);

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
      title: title,
      description: description,
      theme: theme,
      currency: currency,
      tiers: tiers as any,
      billingOptions: billingOptions as any,
    };
    try {
      await updatePricing(data);
      setToast({ message: "Pricing updated", type: "success" });
    } catch (error) {
      setToast({ message: "Error updating pricing", type: "error" });
      return;
    }
  };
  const router = useRouter();
  const closePanel = () => {
    router.push("/");
  };
  return (
    <div className={cn()}>
      <form
        className="flex h-full flex-col bg-slate-700 shadow-xl"
        onSubmit={submitForm}
      >
        <EditorHeader
          title={
            <span>
              <Link className="hover:underline" href="/admin">
                Pricing
              </Link>
              <span className="mx-2">{">"}</span>
              <span className="font-normal">{params.slug}</span>
            </span>
          }
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
    </div>
  );
}
