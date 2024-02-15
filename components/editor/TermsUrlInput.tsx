import { usePricingStore } from "@/lib/store";

export const TermsUrlInput = () => {
  const termsUrl = usePricingStore((state) => state.termsUrl);
  const setTermsUrl = usePricingStore((state) => state.setTermsUrl);
  return (
    <div>
      <label htmlFor="project-name" className="label-text">
        Terms url
      </label>
      <div className="mt-2">
        <input
          type="text"
          className="input input-bordered input-saasi"
          value={termsUrl}
          onChange={(e) => {
            setTermsUrl(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
