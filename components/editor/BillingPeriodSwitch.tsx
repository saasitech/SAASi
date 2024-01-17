import { availableBillingPeriods, usePricingStore } from "@/lib/store";
import { BillingPeriod } from "@/lib/types";

export const BillingPeriodSwitch = () => {
  const pricingStore = usePricingStore((state) => state);
  const periodOrder = {
    week: 0,
    month: 1,
    year: 2,
  };
  const sortedBillingPeriods = Object.keys(periodOrder).sort(
    (a, b) => periodOrder[a as BillingPeriod] - periodOrder[b as BillingPeriod]
  ) as BillingPeriod[];

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
              pricingStore.setShowBillingPeriod(e.target.checked);
            }}
            checked={pricingStore.billingOptions.show}
          />
        </div>
        <div className="flex items-center">
          <label className="label cursor-pointer p-0 flex-1">
            <span className="label-text">Pre selected billing period</span>
          </label>
          <select
            className="select select-sm max-w-xs"
            defaultValue={pricingStore.billingOptions.selected}
            onChange={(e) => {
              pricingStore.setBillingPeriod(e.target.value as any);
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
                    value={pricingStore.billingOptions.labels[key]}
                    onChange={(e) => {
                      pricingStore.setBillingOptionLabel(key, e.target.value);
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
