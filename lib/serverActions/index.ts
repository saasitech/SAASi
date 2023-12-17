"use server";

import featuresClient from "./features";
import tierClient from "./tier";
import termsSummaryClient from "./termsSummary";
import { createServerClient } from "../supabaseServer";

const client = createServerClient();
const prepareServerActions = () => {
  return {
    features: featuresClient(client),
    termsSummary: termsSummaryClient(client),
    tierClient: tierClient(client),
  };
};
export default prepareServerActions;
