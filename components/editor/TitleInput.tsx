import { usePricingStore } from "@/lib/store";

export const PriceTitleInput = () => {
  const title = usePricingStore((state) => state.title);
  const setTitle = usePricingStore((state) => state.setTitle);
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
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
