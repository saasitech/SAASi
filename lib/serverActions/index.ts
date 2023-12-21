"use server";

import pricing from "./pricing";
import { createServerClient } from "../supabaseServer";

const client = createServerClient();
const prepareServerActions = () => {
  return {
    features: pricing(client),
  };
};
export default prepareServerActions;
