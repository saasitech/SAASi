import { PriceEditorPage } from "@/components/editor/PriceEditorPage";
import { PricingPage } from "@/components/pricing/PricingPage";
import { readPricing } from "@/lib/serverActions/pricingActions";
import { StoreProvider } from "@/lib/store/StoreProvider";

export default async function Index() {
  const pricingList = await readPricing();
  const defaultPricing = pricingList.find(
    (pricing) => pricing.isDefault
  ) as any;

  return (
    <StoreProvider {...defaultPricing} pricingList={pricingList}>
      <div className="flex">
        <PricingPage />
        <div className="relative h-screen flex">
          <PriceEditorPage />
        </div>
      </div>
    </StoreProvider>
  );
}
