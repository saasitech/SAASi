import { createServerClient } from "../supabaseServer";
import pricingServerActions from "./pricing";

const client = createServerClient();
export const serverActions = {
  pricing: pricingServerActions(client),
};
