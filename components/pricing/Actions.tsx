import { createPaymentSession } from "@/lib/serverActions/stripeActions";
import { usePricingStore } from "@/lib/store";
import { PriceOneOff, PriceRecurring, TierItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Actions = (tier: TierItem) => {
  const billingOptions = usePricingStore((state) => state.billingOptions);
  const pricingId = usePricingStore((state) => state.id);
  const pricingSlug = usePricingStore((state) => state.slug);
  const termsUrl = usePricingStore((state) => state.termsUrl);
  const button = tier.cta;
  const setDialog = usePricingStore((state) => state.setDialog);
  return (
    <div className={cn("grid gap-4 grid-cols-1")}>
      <div key={button.label} className="w-full">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (button.href) {
              return window.open(button.href, "_blank");
            }
            setDialog({
              title: "Subscription Terms",
              message: tier.terms,
              body: (
                <form
                  id="terms-form"
                  className=""
                  action={async () => {
                    let priceId: string | undefined = "";
                    switch (tier.priceType) {
                      case "one-off":
                        const oneOff = tier.price as PriceOneOff;
                        priceId = oneOff.priceId;
                        break;
                      case "recurring":
                        const recurring = tier.price as PriceRecurring[];
                        priceId = recurring.find(
                          (price) =>
                            price.billingPeriod === billingOptions.selected
                        )?.priceId;
                        break;

                      default:
                        break;
                    }
                    if (!priceId) return;

                    console.log("tirer", tier, "tieroptions", billingOptions);
                    const result = await createPaymentSession(
                      { priceId },
                      { pricingId, pricingSlug }
                    );
                    if (result.url) window.location.href = result.url;
                    setDialog(null);
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-secondary"
                      id="terms"
                      required
                    />
                    <label
                      className="label-text text-base-content ml-2 cursor-pointer select-none"
                      htmlFor="terms"
                    >
                      I agree to the{" "}
                      <a
                        className="link"
                        href={termsUrl}
                        target="_blank"
                        rel="
                        noopener noreferrer"
                      >
                        terms & conditions
                      </a>
                    </label>
                  </div>
                </form>
              ),
              actions: (
                <button
                  type="submit"
                  form="terms-form"
                  className="btn btn-secondary btn-md min-w-[80px]"
                >
                  Subscribe
                </button>
              ),
              type: "info",
            });
          }}
          className="btn btn-secondary w-full"
        >
          {button.label}
        </button>
      </div>
    </div>
  );
};
