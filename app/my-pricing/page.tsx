import MainMenu from "@/components/MainMenu";
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
        <main className="flex-1 flex flex-col gap-6">
          <main className="relative isolate min-h-full">
            <img
              src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
            />
            <div className="mx-auto w-full px-6 py-32 text-center sm:py-40 lg:px-8">
              <p className="text-base font-semibold leading-8 text-white">
                Well, we haven't finished this one yet. Just need couple more
                hours ;)
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Coming soon...
              </h1>
              <div className="mt-10 flex justify-center">
                <a
                  href="/"
                  className="text-sm font-semibold leading-7 text-white"
                >
                  <span aria-hidden="true">&larr;</span> Back to home
                </a>
              </div>
            </div>
          </main>
        </main>
      </div>
      <footer></footer>
    </div>
  );
}
