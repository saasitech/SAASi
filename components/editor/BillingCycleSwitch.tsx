import { usePricingStore } from "@/lib/store";

export const BillingCycleSwitch = () => {
  const pricingStore = usePricingStore((state) => state);
  return (
    <div className="form-control">
      <label className="label cursor-pointer p-0">
        <span className="label-text">Show billing options</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          onChange={(e) => {
            pricingStore.setShowBillingCycle(e.target.checked);
          }}
          checked={pricingStore.showBillingCycle}
        />
      </label>
    </div>
  );
};
