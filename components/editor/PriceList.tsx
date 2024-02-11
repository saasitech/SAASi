"use client";
import { updatePricing } from "@/lib/serverActions/pricingActions";
import { usePricingStore } from "@/lib/store";
import {
  ArchiveBoxXMarkIcon,
  ArrowUturnLeftIcon,
  DocumentDuplicateIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PricingCardItem from "../pricing/PricingCardItem";
import { EditorHeader } from "./EditorHeader";
import { TopMenu } from "./TopMenu";

export default function PriceList() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const router = useRouter();
  const pricingList = usePricingStore((state) => state.pricingList);
  const setPricingList = usePricingStore((state) => state.setPricingList);
  const setToast = usePricingStore((state) => state.setToast);

  const filteredList = pricingList.filter((pricing) =>
    status === "active"
      ? pricing.archivedAt === null
      : pricing.archivedAt !== null
  );

  const activeCount = pricingList.filter(
    (pricing) => pricing.archivedAt === null
  ).length;
  const archivedCount = pricingList.filter(
    (pricing) => pricing.archivedAt !== null
  ).length;

  const closePanel = () => {
    router.push("/");
  };

  return (
    <div className="flex h-full flex-col bg-slate-700 shadow-xl">
      <EditorHeader title="Pricing" onClose={closePanel} />
      <TopMenu activeCount={activeCount} archivedCount={archivedCount} />
      {filteredList.map((pricingItem) => (
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
                <span className="badge badge-sm badge-secondary">Default</span>
              </h2>
              <div className="card-actions justify-end">
                <div className="tooltip tooltip-bottom" data-tip="Archive">
                  {!pricingItem.isDefault && (
                    <button
                      onClick={async () => {
                        pricingItem.archivedAt = pricingItem.archivedAt
                          ? null
                          : new Date();
                        try {
                          await updatePricing(pricingItem);
                          pricingList[
                            pricingList.findIndex(
                              (pricingList) => pricingList.id === pricingItem.id
                            )
                          ] = pricingItem;
                          setPricingList(pricingList);
                          setToast({
                            message: pricingItem.archivedAt
                              ? "Pricing is active"
                              : "Pricing archived",
                            type: "success",
                          });
                        } catch (error) {
                          setToast({
                            message: "Error archiving pricing",
                            type: "error",
                          });
                          return;
                        }
                      }}
                      className="btn btn-sm btn-circle hover:text-warning"
                    >
                      {pricingItem.archivedAt ? (
                        <ArrowUturnLeftIcon className="w-4 h-4" />
                      ) : (
                        <ArchiveBoxXMarkIcon className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Duplicate">
                  <button className="btn btn-sm btn-circle hover:text-primary">
                    <DocumentDuplicateIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="View/Edit">
                  <Link
                    href={`/admin/${pricingItem.slug}`}
                    className="btn btn-sm btn-circle hover:text-primary"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
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
  );
}
