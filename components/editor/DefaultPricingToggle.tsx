import { usePricingStore } from "@/lib/store";

export const DefaultPricingToggle = () => {
  const isDefault = usePricingStore((state) => state.isDefault);
  const setDefault = usePricingStore((state) => state.setDefault);

  return (
    <div className="flex items-center">
      <label className="label cursor-pointer p-0 flex-1">
        <span className="label-text">Set as a default pricing</span>
      </label>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        onChange={(e) => {
          setDefault(e.target.checked);
        }}
        checked={isDefault}
      />
    </div>
  );
};
