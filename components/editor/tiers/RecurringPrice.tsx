import { availableBillingPeriods } from "@/lib/constants";
import { usePricingStore } from "@/lib/store";
import { BillingPeriod, PriceRecurring, TierItem } from "@/lib/types";
import {
  ExclamationTriangleIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export const RecurringPrice = ({ tier }: { tier: TierItem }) => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  const price = tier.price as PriceRecurring[];

  const selectedBillingPeriods = price.map((i) => i.billingPeriod);
  const reducedBillingPeriods = availableBillingPeriods.filter(
    (i) => !selectedBillingPeriods.includes(i)
  );
  const hasDuplicateBillingPeriods =
    new Set(selectedBillingPeriods).size !== selectedBillingPeriods.length;
  return (
    <div className="space-y-2">
      <label htmlFor="description" className="label-text ">
        Pricing{" "}
        {hasDuplicateBillingPeriods && (
          <div className="tooltip tooltip-warning" data-tip="Duplicate Pricing">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 inline" />
          </div>
        )}
      </label>
      {Array.isArray(price) &&
        price.map((priceItem, index) => {
          return (
            <div
              className="mt-2 relative flex items-center space-x-2"
              key={index}
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="project-name"
                  id="project-name"
                  className="input input-bordered input-saasi !pr-[200px]"
                  value={priceItem.value}
                  onChange={(e) => {
                    priceItem.value = e.target.value;
                    setTiers(tiers);
                  }}
                />
                <div className="absolute right-1 space-x-1">
                  <select
                    className="select select-sm max-w-xs"
                    value={priceItem?.billingPeriod}
                    onChange={(e) => {
                      priceItem.billingPeriod = e.target.value as BillingPeriod;
                      setTiers(tiers);
                    }}
                  >
                    {availableBillingPeriods.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  tier.price = price.filter(
                    (i) => i.billingPeriod !== priceItem.billingPeriod
                  );
                  setTiers([...tiers]);
                }}
              >
                <MinusCircleIcon className="h-6 w-6 " />
              </button>
            </div>
          );
        })}
      {availableBillingPeriods.length !== selectedBillingPeriods.length && (
        <button
          className="btn btn-ghost w-full text-primary"
          onClick={(e) => {
            e.preventDefault();
            const newPrice = {
              value: 0,
              billingPeriod: reducedBillingPeriods[0],
              billingCycle: 1,
            };
            tier.price = [...(tier.price as PriceRecurring[]), newPrice].map(
              (f, index) => ({ ...f, id: index })
            );
            setTiers([...tiers]);
          }}
        >
          Add Price <PlusCircleIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
