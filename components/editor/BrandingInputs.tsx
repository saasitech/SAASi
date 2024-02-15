import { logoSizes } from "@/lib/constants";
import { usePricingStore } from "@/lib/store";
import { LogoKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export const LogoUrlInput = () => {
  const branding = usePricingStore((state) => state.branding);
  const setBranding = usePricingStore((state) => state.setBranding);
  const selectedSize = branding.logoSize || "md";
  return (
    <div className="space-y-2">
      <div>
        <label htmlFor="project-name" className="label-text">
          Company name
        </label>
        <div className="mt-2">
          <input
            type="text"
            className="input input-bordered input-saasi"
            value={branding.companyName}
            onChange={(e) => {
              setBranding({ companyName: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="project-name" className="label-text">
          Company website URL
        </label>
        <div className="mt-2">
          <input
            type="text"
            className="input input-bordered input-saasi"
            value={branding.websiteUrl}
            onChange={(e) => {
              setBranding({ websiteUrl: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="project-name" className="label-text">
          Logo image/svg url
        </label>
        <div className="mt-2">
          <input
            type="text"
            className="input input-bordered input-saasi"
            value={branding.logoUrl}
            onChange={(e) => {
              setBranding({ logoUrl: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {(Object.keys(logoSizes) as LogoKey[]).map((size) => (
          <button
            key={size}
            type="button"
            className={cn("btn btn-xs", size === selectedSize && "btn-primary")}
            onClick={() => {
              setBranding({ logoSize: size });
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
