import NotFound from "@/app/not-found";
import { PriceEditorPage } from "@/components/editor/PriceEditorPage";
import { PricingPage } from "@/components/pricing/PricingPage";
import {
  readPricing,
  readPricingBySlug,
} from "@/lib/serverActions/pricingActions";
import { StoreProvider } from "@/lib/store/StoreProvider";
import { defaultPricingState } from "@/lib/store/pricingSlice";

export default async function Index({ params }: { params: { slug: string } }) {
  const pricingList = await readPricing();
  try {
    const pricing: any =
      params.slug === "new"
        ? defaultPricingState
        : await readPricingBySlug(params.slug);

    return (
      <StoreProvider {...pricing} pricingList={pricingList}>
        <div className="flex">
          <PricingPage />
          <div className="relative h-screen flex">
            <PriceEditorPage />
          </div>
        </div>
      </StoreProvider>
    );
  } catch (e) {
    return <NotFound />;
  }
}
