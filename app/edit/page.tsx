import { PriceEditor } from "@/components/editor/PriceEditor";
import SyncStore from "@/components/pricing/SyncStore";
import { PricingPage } from "@/components/PricingPage";
import { serverActions } from "@/lib/serverActions";

export default async function Index() {
  const defaultPricing: any = await serverActions.pricing.readDefault();

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
