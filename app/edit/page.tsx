import { PricingPage } from "@/components/PricingPage";
import { PriceEditor } from "@/components/editor/PriceEditor";
import SyncStore from "@/components/pricing/SyncStore";
import { readDefaultPricing } from "@/lib/serverActions/pricingActions";

export default async function Index() {
  const defaultPricing = await readDefaultPricing();

  return (
    <div className="flex">
      <SyncStore state={defaultPricing} />
      <PricingPage />
      <div className="relative h-screen flex">
        <PriceEditor />
      </div>
    </div>
  );
}
