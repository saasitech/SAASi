import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { features } from "process";

const prepareServerActions = (client: DbClientType) => {
  return {
    read: async () => {
      const result = await client.from("tier").select();
      return result.data;
    },
    create: async (input: TablesInsert<"tier">) => {
      const result = await client.from("tier").insert(input).select();
      return result.data;
    },
    update: async (id: number, input: TablesUpdate<"tier">) => {
      const result = await client
        .from("tier")
        .update(input)
        .eq("id", id)
        .select();
      return result.data;
    },
    delete: async (id: number) => {
      const result = await client.from("tier").delete().eq("id", id).select();
      return result.data;
    },
    getTierFeatures: async (id: number) => {
      const result = await client
        .from("tier__feature")
        .select("feature(*)")
        .eq("tier_id", id);
      return result;
    },
  };
};
export default prepareServerActions;
