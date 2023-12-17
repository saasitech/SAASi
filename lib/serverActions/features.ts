import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

const prepareServerActions = (client: DbClientType) => {
  return {
    read: async () => {
      const result = await client.from("feature").select();
      return result.data;
    },
    create: async (input: TablesInsert<"feature">) => {
      const result = await client.from("feature").insert(input).select();
      return result.data;
    },
    update: async (id: number, input: TablesUpdate<"feature">) => {
      const result = await client
        .from("feature")
        .update(input)
        .eq("id", id)
        .select();
      return result.data;
    },
    delete: async (id: number) => {
      const result = await client
        .from("feature")
        .delete()
        .eq("id", id)
        .select();
      return result.data;
    },
  };
};
export default prepareServerActions;
