"use server";

import featuresClient from "./features";
import tierClient from "./tier";
import termsSummaryClient from "./termsSummary";
import pricing_tier_billingCycleOption from "./pricing_tier_billingCycleOption";
import { createServerClient } from "../supabaseServer";

const client = createServerClient();
const prepareServerActions = () => {
  return {
    features: featuresClient(client),
    termsSummary: termsSummaryClient(client),
    tierClient: tierClient(client),
    pricing_tier_billingCycleOption: pricing_tier_billingCycleOption(client),
  };
};
export default prepareServerActions;
