import { usePricingStore } from "@/lib/store";

export const TermsUrlInput = () => {
  const pricingStore = usePricingStore((state) => state);
  return (
    <div>
      <label htmlFor="project-name" className="label-text">
        Terms url
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="project-name"
          id="project-name"
          className="input input-bordered input-saasi"
          value={pricingStore.termsUrl}
          onChange={(e) => {
            pricingStore.setTermsUrl(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
