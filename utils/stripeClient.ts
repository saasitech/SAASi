import { StripeClient } from "@/lib/types";
import stripe from "stripe";

const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY || "";
if (!stripeSecretKey) {
  throw new Error("Missing Stripe secret key");
}
export const stripeClient = new stripe(stripeSecretKey);
export const config: StripeClient.StripeConfig = {
  defaultSuccessUrl: process.env.STRIPE_DEFAULT_SUCCESS_URL || "",
  defaultCancelUrl: process.env.STRIPE_DEFAULT_CANCEL_URL || "",
};
