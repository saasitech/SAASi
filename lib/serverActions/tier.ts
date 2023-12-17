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
    getTierFeatures: async (tierId: number) => {
      const result = await client
        .from("tier__feature")
        .select("feature(*)")
        .eq("tier_id", tierId);
      return result.data?.map((item) => {
        return item.feature;
      });
    },
    deleteTierFeatures: async (id: number, featureId: number) => {
      const result = await client
        .from("tier__feature")
        .delete()
        .eq("tier_id", id)
        .eq("feature_id", featureId);

      return result;
    },
  };
};
export default prepareServerActions;
