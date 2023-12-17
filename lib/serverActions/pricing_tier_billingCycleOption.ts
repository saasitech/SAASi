import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { getErrorHandler } from "./common";

const prepareServerActions = (client: DbClientType) => {
  const selectWithJoins = "*, pricing(*), tier(*), billing_cycle_option(*)";
  const defaultErrorHandler = getErrorHandler(
    "pricing__tier__billing_cycle_option"
  );

  return {
    read: async () => {
      try {
        const { data, error } = await client
          .from("pricing__tier__billing_cycle_option")
          .select(selectWithJoins);

        if (error) throw error;
        return data;
      } catch (err) {
        defaultErrorHandler(err, "read");
      }
    },

    upsert: async (
      input: TablesInsert<"pricing__tier__billing_cycle_option">
    ) => {
      try {
        const { data, error } = await client
          .from("pricing__tier__billing_cycle_option")
          .upsert(input)
          .select();

        if (error) throw error;
        return data;
      } catch (err) {
        defaultErrorHandler(err, "upser");
      }
    },

    delete: async (
      pricingId: number,
      tierId: number,
      billingOptionId: number
    ) => {
      try {
        const { data, error } = await client
          .from("pricing__tier__billing_cycle_option")
          .delete()
          .eq("pricing_id", pricingId)
          .eq("tier_id", tierId)
          .eq("billing_option_id", billingOptionId)
          .select();

        if (error) throw error;
        return data;
      } catch (err) {
        defaultErrorHandler(err, "delete");
      }
    },
  };
};

export default prepareServerActions;
