import { createSession } from "@/lib/serverActions/pricingActions";
import { useAppStore, usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Actions = (tier: TierItem) => {
  const setDialog = useAppStore((state) => state.setDialog);
  const pricingStore = usePricingStore((state) => state);
  return (
    <div
      className={cn(
        "grid gap-4",
        tier.buttons.length === 1 && "grid-cols-1",
        tier.buttons.length === 2 && "grid-cols-2"
      )}
    >
      {tier.buttons.map((button) => (
        <div key={button.name} className="w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              // window.location.href = button.href?.toString() || "";
              setDialog({
                title: "Subscription Terms",
                message: tier.terms,
                body: (
                  <form
                    id="terms-form"
                    className=""
                    action={async () => {
                      const result = await createSession(
                        tier,
                        pricingStore.billingOptions
                      );
                      // setDialog(null);
                      console.log("Confirm", result);
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
                          href={pricingStore.termsUrl}
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
                    className="btn btn-primary btn-sm min-w-[80px]"
                  >
                    Subscribe
                  </button>
                ),
                type: "info",
              });
            }}
            className="btn btn-secondary w-full"
          >
            {button.name}
          </button>
        </div>
      ))}
    </div>
  );
};
