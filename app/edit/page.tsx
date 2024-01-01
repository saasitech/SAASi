import { PriceEditor } from "@/components/editor/PriceEditor";
import { PricingPage } from "@/components/PricingPage";
export default async function Index() {
  return (
    <div className="flex">
      <PricingPage />
      <div className="relative h-screen flex">
        <PriceEditor />
      </div>
    </div>
  );
}
