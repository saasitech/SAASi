import { PricingPage } from "@/components/PricingPage";
import { ToastTrigger } from "@/components/Toast";
import SyncStore from "@/components/pricing/SyncStore";
import {
  readDefaultPricing,
  readPricingBySlug,
} from "@/lib/serverActions/pricingActions";
export default async function Index({ params }: { params: { slug: string } }) {
  try {
    const pricingBySlug = await readPricingBySlug(params.slug);
    return (
      <div className="flex">
        <SyncStore state={pricingBySlug} />
        <PricingPage />
      </div>
    );
  } catch (e) {
    const defaultPricing = await readDefaultPricing();
    return (
      <div>
        <div className="flex">
          <ToastTrigger message="Pricing not found" type="error" />
          <SyncStore state={defaultPricing} />
          <PricingPage />
        </div>
      </div>
    );
  }
}
