import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { getErrorHandler } from "./common";

const prepareServerActions = (client: DbClientType) => {
  const defaultErrorHandler = getErrorHandler("terms_summary");

  return {
    read: async () => {
      try {
        const result = await client.from("terms_summary").select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "read");
      }
    },
    create: async (input: TablesInsert<"terms_summary">) => {
      try {
        const result = await client
          .from("terms_summary")
          .insert(input)
          .select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "create");
      }
    },
    update: async (id: number, input: TablesUpdate<"terms_summary">) => {
      try {
        const result = await client
          .from("terms_summary")
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
          .from("terms_summary")
          .delete()
          .eq("id", id)
          .select();
        if (result.error) throw result.error;
        return !result.error;
      } catch (err) {
        defaultErrorHandler(err, "delete");
      }
    },
  };
};

export default prepareServerActions;
