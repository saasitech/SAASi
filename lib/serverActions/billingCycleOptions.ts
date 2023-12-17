import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { getErrorHandler } from "./common"; // Ensure correct import path

const prepareServerActions = (client: DbClientType) => {
  const defaultErrorHandler = getErrorHandler("billing_cycle_option");

  return {
    read: async () => {
      try {
        const result = await client.from("billing_cycle_option").select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "read");
      }
    },
    create: async (input: TablesInsert<"billing_cycle_option">) => {
      try {
        const result = await client
          .from("billing_cycle_option")
          .insert(input)
          .select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "create");
      }
    },
    update: async (id: number, input: TablesUpdate<"billing_cycle_option">) => {
      try {
        const result = await client
          .from("billing_cycle_option")
          .update(input)
          .eq("id", id)
          .select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "update");
      }
    },
    delete: async (id: number) => {
      try {
        const result = await client
          .from("billing_cycle_option")
          .delete()
          .eq("id", id)
          .select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "delete");
      }
    },
  };
};

export default prepareServerActions;
