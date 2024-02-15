import Logo from "@/components/common/Logo";
import { usePricingStore } from "@/lib/store";

export default function Header() {
  const description = usePricingStore((state) => state.description);
  const branding = usePricingStore((state) => state.branding);
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a href={branding.websiteUrl} target="_blank" rel="noreferrer">
          <Logo
            className="light:text-black dark:text-white w-auto"
            src={branding.logoUrl}
            alt={branding.companyName || "logo"}
            size={branding.logoSize || "md"}
          />
        </a>
      </div>
      <h1
        className="text-2xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center font-light text-base-content"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
