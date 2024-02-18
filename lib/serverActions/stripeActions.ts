"use server";
import { stripeClient } from "@/utils/stripeClient";
import Stripe from "stripe";
import { StripeClient } from "../types";

const createPaymentSession = async (
  params: StripeClient.CreateSessionParams,
  meta?: any
) => {
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: params.priceId, quantity: 1 },
  ];
  const sessionCreateParams = {
    customer: params.customerId,
    mode: "subscription",
    subscription_data: {
      metadata: meta,
    },
    tax_id_collection: { enabled: true },

    line_items: items,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  } as Stripe.Checkout.SessionCreateParams;

  const session = await stripeClient.checkout.sessions.create(
    sessionCreateParams
  );
  return session;
};
