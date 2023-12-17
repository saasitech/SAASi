import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

const prepareServerActions = (client: DbClientType) => {
  return {
    read: async () => {
      const result = await client.from("terms_summary").select();
      return result.data;
    },
    create: async (input: TablesInsert<"terms_summary">) => {
      const result = await client.from("terms_summary").insert(input).select();
      return result.data;
    },
    update: async (id: number, input: TablesUpdate<"terms_summary">) => {
      const result = await client
        .from("terms_summary")
        .update(input)
        .eq("id", id)
        .select();
      return result.data;
    },
    delete: async (id: number) => {
      const result = await client
        .from("terms_summary")
        .delete()
        .eq("id", id)
        .select();
      return !result.error;
    },
  };
};
export default prepareServerActions;
