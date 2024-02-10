import { PricingPage } from "@/components/pricing/PricingPage";
import { readPricingBySlug } from "@/lib/serverActions/pricingActions";
import { StoreProvider } from "@/lib/store/StoreProvider";

export default async function Index({ params }: { params: { slug: string } }) {
  const pricing: any = await readPricingBySlug(params.slug);

  return (
    <StoreProvider {...pricing}>
      <div className="flex">
        <PricingPage />
      </div>
    </StoreProvider>
  );
}
