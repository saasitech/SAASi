import { PricingPage } from "@/components/PricingPage";
import { PriceEditor } from "@/components/editor/PriceEditor";
import SyncStore from "@/components/pricing/SyncStore";
import pricingActions from "@/lib/serverActions/pricing";
import { createServerClient } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerClient(cookies());
  const defaultPricing = await pricingActions(supabase).readDefault();

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
