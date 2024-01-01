import { usePricingStore } from "@/lib/store";

export const PriceTitleInput = () => {
  const pricingStore = usePricingStore((state) => state);
  return (
    <div>
      <label htmlFor="project-name" className="label-text">
        Pricing name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="project-name"
          id="project-name"
          className="input input-bordered input-saasi"
          value={pricingStore.title}
          onChange={(e) => {
            pricingStore.setTitle(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
