import NotFound from "@/app/not-found";
import { PriceEditorPage } from "@/components/editor/PriceEditorPage";
import { PricingPage } from "@/components/pricing/PricingPage";
import { readPricingBySlug } from "@/lib/serverActions/pricingActions";
import { StoreProvider } from "@/lib/store/StoreProvider";

export default async function Index({ params }: { params: { slug: string } }) {
  try {
    const pricing: any = await readPricingBySlug(params.slug);
    return (
      <StoreProvider {...pricing}>
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
