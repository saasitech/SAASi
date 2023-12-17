"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import featuresClient from "./features";
import tierClient from "./tier";
import termsSummaryClient from "./termsSummary";
import { Database } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";

const prepareServerActions = (client: DbClientType) => {
  return {
    features: featuresClient(client),
    termsSummary: termsSummaryClient(client),
    tierClient: tierClient(client),
  };
};
export default prepareServerActions;
