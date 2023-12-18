import MainMenu from "@/components/DrawerMenu";
import Header from "@/components/Header";
import PricingList from "@/components/pricing/PricingList";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Index() {
  const pricingList = [
    {
      style: "Default",
    },
  ];
  const selectedPricing = pricingList[0];
  // const selectedPricingComponent = pricingStyles[selectedPricing.style];

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-6xl flex justify-between items-center p-3 text-sm">
          <div className="flex">
            <Link href={`/`} className="btn btn-outline btn-sm">
              <ArrowLongLeftIcon className="w-5 h-5" /> Back
            </Link>
          </div>
          <MainMenu />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-6xl px-3">
        <Header />
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8" />
        <main className="flex-1 flex flex-col gap-6">
          <div>
            <PricingList style={selectedPricing.style} />
          </div>
        </main>
      </div>
      <footer></footer>
    </div>
  );
}
