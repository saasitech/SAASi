import { createSession } from "@/lib/serverActions/pricingActions";
import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Actions = (tier: TierItem) => {
  const billingOptions = usePricingStore((state) => state.billingOptions);
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
                    const result = await createSession(tier, billingOptions);
                    // setDialog(null);
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id="terms"
                      required
                    />
                    <label
                      className="label-text text-primary ml-2 cursor-pointer select-none"
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
                  className="btn btn-primary btn-md min-w-[80px]"
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
