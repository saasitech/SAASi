import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { getErrorHandler } from "./common"; // Ensure this path is correct

const prepareServerActions = (client: DbClientType) => {
  const defaultErrorHandler = getErrorHandler("feature");

  return {
    read: async () => {
      try {
        const result = await client.from("feature").select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "read");
      }
    },
    create: async (input: TablesInsert<"feature">) => {
      try {
        const result = await client.from("feature").insert(input).select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "create");
      }
    },
    update: async (id: number, input: TablesUpdate<"feature">) => {
      try {
        const result = await client
          .from("feature")
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
          .from("feature")
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
