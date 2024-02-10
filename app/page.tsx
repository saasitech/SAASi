import { PricingPage } from "@/components/pricing/PricingPage";
import { readDefaultPricing } from "@/lib/serverActions/pricingActions";
import { StoreProvider } from "@/lib/store/StoreProvider";
import NotFound from "./not-found";

export default async function Index() {
  try {
    const defaultPricing: any = await readDefaultPricing();
    return (
      <StoreProvider {...defaultPricing}>
        <div className="flex">
          <PricingPage />
        </div>
      </StoreProvider>
    );
  } catch (e) {
    return <NotFound />;
  }
}
