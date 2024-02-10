import { currencies } from "@/lib/currencies";
import { usePricingStore } from "@/lib/store";

export const CurrencySelect = () => {
  const currency = usePricingStore((state) => state.currency);
  const setCurrency = usePricingStore((state) => state.setCurrency);

  return (
    <div className="form-control">
      <label className="label cursor-pointer p-0">
        <span className="label-text">Currency</span>
        <select
          className="select select-sm max-w-xs"
          defaultValue={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          {currencies.map((i, index) => {
            return (
              <option disabled={i.includes(".")} key={i}>
                {i}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
