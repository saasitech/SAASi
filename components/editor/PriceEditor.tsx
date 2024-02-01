"use client";
import { updatePricing } from "@/lib/serverActions/pricingActions";
import { useAppStore, usePricingListStore, usePricingStore } from "@/lib/store";
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

export const PriceEditor = () => {
  const router = useRouter();
  const closePanel = () => {
    router.push("/");
  };
  const pricingStore = usePricingStore((state) => state);
  const pricingList = usePricingListStore((state) => state.pricingList);
  const setToast = useAppStore((state) => state.setToast);
  const params = useParams<{ slug: string }>();

  return (
    <div
      className="pointer-events-auto max-w-md text-sm text-base-content min-w-[380px]"
      style={themeStyle}
    >
      {params?.slug ? (
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
          <EditorHeader
            title="Edit Pricing"
            description="Add tiers and features, manage prices, choose style and more."
            onClose={closePanel}
          />
          <TopMenu />
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
          <EditorHeader
            title="My Pricing List"
            description={"ddd"}
            onClose={closePanel}
          />
          {/* <TopMenu /> */}
          <ul className="bg-base-200/25 menu-horizontal w-full p-4 space-x-2">
            <li>
              <a className="btn btn-sm btn-primary btn-outline font-normal">
                Active
                <span className="badge badge-sm badge-primary">99+</span>
              </a>
            </li>
            <li>
              <a className="btn btn-sm btn-ghost font-normal">
                Archived
                <span className="badge badge-sm">99+</span>
              </a>
            </li>
          </ul>
          {pricingList.map((pricingItem) => (
            <div
              key={pricingItem.slug}
              className="space-y-4 my-4 px-4 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-slate-700 overflow-y-auto"
            >
              <div className="bg-base-100 shadow-xl rounded-lg p-4 space-y-4">
                {/* <IFrame>
                  <html style={{ fontSize: "4px" }}>
                    <PricingPage />
                  </html>
                </IFrame> */}
                {/* <div
                  style={getTheme(item.theme)}
                  className="flex m-4 space-x-1 text-xs"
                >
                  <div className="w-[50px] h-full p-1 bg-slate-500">$9.99</div>
                  <div className="w-[50px] h-full p-1 bg-slate-500">$199</div>
                  <div className="w-[50px] h-full p-1 bg-slate-500">
                    Contact us
                  </div>
                </div> */}

                <div className="flex justify-between items-center ">
                  <h2 className="flex font-semibold items-center space-x-2">
                    <span>{pricingItem.title}</span>
                    <span className="badge badge-sm badge-secondary">
                      Default
                    </span>
                  </h2>
                  <div className="card-actions justify-end">
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip="View/Edit"
                    >
                      <Link
                        href={`/admin/${pricingItem.slug}`}
                        className="btn btn-sm btn-circle"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                    </div>
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip="Duplicate"
                    >
                      <div className="btn btn-sm btn-circle">
                        <DocumentDuplicateIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Archive">
                      <div className="btn btn-sm btn-circle">
                        <ArchiveBoxXMarkIcon className="w-4 h-4 text-warning" />
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
