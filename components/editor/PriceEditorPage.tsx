"use client";
import { updatePricing } from "@/lib/serverActions/pricingActions";
import { usePricingStore } from "@/lib/store";
import { getTheme } from "@/lib/themes";
import {
  ArchiveBoxXMarkIcon,
  DocumentDuplicateIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import PricingCardItem from "../pricing/PricingCardItem";
import { ActionButtons } from "./ActionButtons";
import { BillingPeriodSwitch } from "./BillingPeriodSwitch";
import { CurrencySelect } from "./CurrencySelect";
import { DescriptionInput } from "./DescriptionInput";
import { EditorHeader } from "./EditorHeader";
import { TermsUrlInput } from "./TermsUrlInput";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceTitleInput } from "./TitleInput";
import { TopMenu } from "./TopMenu";
import { TiersManager } from "./tiers/TiersManager";

const themeStyle = getTheme("dim");

export const PriceEditorPage = () => {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const closePanel = () => {
    router.push("/");
  };
  const id = usePricingStore((state) => state.id);
  const title = usePricingStore((state) => state.title);
  const description = usePricingStore((state) => state.description);
  const theme = usePricingStore((state) => state.theme);
  const currency = usePricingStore((state) => state.currency);
  const tiers = usePricingStore((state) => state.tiers);
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const pricingList = usePricingStore((state) => state.pricingList);
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

  return (
    <div
      className="pointer-events-auto max-w-md text-sm text-base-content min-w-[380px]"
      style={themeStyle}
    >
      {params?.slug ? (
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
      ) : (
        <div className="flex h-full flex-col bg-slate-700 shadow-xl">
          <EditorHeader title="My Pricing List" onClose={closePanel} />
          <TopMenu />
          {pricingList.map((pricingItem) => (
            <div
              key={pricingItem.slug}
              className="space-y-4 my-4 px-4 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-slate-700 overflow-y-auto"
            >
              <div className="bg-base-100 shadow-xl rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center ">
                  <h2 className="flex font-semibold items-center space-x-2">
                    <Link
                      className="hover:underline"
                      href={`
                     /admin/${pricingItem.slug}
                    `}
                    >
                      {pricingItem.title}
                    </Link>
                    <span className="badge badge-sm badge-secondary">
                      Default
                    </span>
                  </h2>
                  <div className="card-actions justify-end">
                    <div className="tooltip tooltip-bottom" data-tip="Archive">
                      <div className="btn btn-sm btn-circle hover:text-warning">
                        <ArchiveBoxXMarkIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip="View/Edit"
                    >
                      <Link
                        href={`/admin/${pricingItem.slug}`}
                        className="btn btn-sm btn-circle hover:text-primary"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                    </div>
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip="Duplicate"
                    >
                      <div className="btn btn-sm btn-circle hover:text-primary">
                        <DocumentDuplicateIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  {pricingItem.tiers.map((tier) => (
                    <PricingCardItem key={tier.id} tier={tier} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
