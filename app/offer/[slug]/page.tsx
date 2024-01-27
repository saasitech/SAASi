import { PricingPage } from "@/components/PricingPage";
import SyncStore from "@/components/pricing/SyncStore";
import { readPricingBySlug } from "@/lib/serverActions/pricingActions";
export default async function Index({ params }: { params: { slug: string } }) {
  try {
    const defaultPricing = await readPricingBySlug(params.slug);
    return (
      <div className="flex">
        <SyncStore state={defaultPricing} />
        <PricingPage />
      </div>
    );
  } catch (e) {
    return <div className="p-4 m-auto text-center">Not found</div>;
  }
}
