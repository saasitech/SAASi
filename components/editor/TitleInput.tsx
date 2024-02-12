import { usePricingStore } from "@/lib/store";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const PriceTitleInput = () => {
  const title = usePricingStore((state) => state.title);
  // const slug = usePricingStore((state) => state.slug);
  const setTitle = usePricingStore((state) => state.setTitle);
  const [error, setError] = useState("");
  const pricingList = usePricingStore((state) => state.pricingList);
  const checkTitle = (newTitle) => {
    if (
      pricingList.some((pricing) => {
        return pricing.title.toLowerCase() === newTitle.toLowerCase().trim();
      })
    ) {
      setError("Pricing name already exists");
    } else {
      error && setError("");
    }
  };

  useEffect(() => {
    checkTitle(title);
  }, []);
  return (
    <div>
      <label htmlFor="project-name" className="label-text space-x-2">
        <span>Pricing name</span>
        {error && (
          <div
            className="tooltip tooltip-bottom tooltip-warning"
            data-tip={error}
          >
            <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 inline" />
          </div>
        )}
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
            checkTitle(e.target.value);
          }}
        />

        {/* <div className="text-xs mt-1">
          Slug: <span>{slug}</span>
        </div> */}
      </div>
    </div>
  );
};
