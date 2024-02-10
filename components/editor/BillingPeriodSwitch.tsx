import { availableBillingPeriods } from "@/lib/constants";
import { usePricingStore } from "@/lib/store";

import { BillingPeriod } from "@/lib/types";
import { useMemo } from "react";

export const BillingPeriodSwitch = () => {
  const setShowBillingPeriod = usePricingStore(
    (state) => state.setShowBillingPeriod
  );
  const setBillingPeriod = usePricingStore((state) => state.setBillingPeriod);
  const setBillingOptionLabel = usePricingStore(
    (state) => state.setBillingOptionLabel
  );
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const periodOrder = {
    week: 0,
    month: 1,
    year: 2,
  };
  const sortedBillingPeriods = useMemo(
    () =>
      Object.keys(periodOrder).sort(
        (a, b) =>
          periodOrder[a as BillingPeriod] - periodOrder[b as BillingPeriod]
      ) as BillingPeriod[],
    [billingOptions]
  );

  return (
    <div className="space-y-2">
      <label className="label cursor-pointer p-0">
        <span className="label-text">Billing options</span>
      </label>
      <div className="rounded-lg border border-base-300 bg-base-100 bg-opacity-30 p-4 space-y-4">
        <div className="flex items-center">
          <label className="label cursor-pointer p-0 flex-1">
            <span className="label-text">Show billing period selector</span>
          </label>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={(e) => {
              setShowBillingPeriod(e.target.checked);
            }}
            checked={billingOptions.show}
          />
        </div>
        <div className="flex items-center">
          <label className="label cursor-pointer p-0 flex-1">
            <span className="label-text">Pre selected billing period</span>
          </label>
          <select
            className="select select-sm max-w-xs"
            defaultValue={billingOptions.selected}
            onChange={(e) => {
              setBillingPeriod(e.target.value as any);
            }}
          >
            {availableBillingPeriods.map((i, index) => {
              return (
                <option disabled={i.includes(".")} key={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
        <div className="space-y-2">
          <label className="label cursor-pointer p-0">
            <span className="label-text">Labels</span>
          </label>
          <div className="flex flex-col space-y-1">
            {sortedBillingPeriods.map((key) => {
              return (
                <div className="flex items-center" key={key}>
                  <label className="label cursor-pointer p-0 flex-1">
                    <span className="label-text">{key}:</span>
                  </label>
                  <input
                    type="text"
                    className="input input-sm w-[160px]"
                    placeholder={key}
                    value={billingOptions.labels[key]}
                    onChange={(e) => {
                      setBillingOptionLabel(key, e.target.value);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
