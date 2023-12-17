import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { getErrorHandler } from "./common";

const prepareServerActions = (client: DbClientType) => {
  const defaultErrorHandler = getErrorHandler("tier");

  return {
    read: async () => {
      try {
        const result = await client.from("tier").select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "read");
      }
    },
    create: async (input: TablesInsert<"tier">) => {
      try {
        const result = await client.from("tier").insert(input).select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "create");
      }
    },
    update: async (id: number, input: TablesUpdate<"tier">) => {
      try {
        const result = await client
          .from("tier")
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
        const result = await client.from("tier").delete().eq("id", id).select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "delete");
      }
    },
    getTierFeatures: async (tierId: number) => {
      try {
        const result = await client
          .from("tier__feature")
          .select("feature(*)")
          .eq("tier_id", tierId);
        if (result.error) throw result.error;
        return result.data?.map((item) => item.feature);
      } catch (err) {
        defaultErrorHandler(err, "getTierFeatures");
      }
    },
    deleteTierFeatures: async (id: number, featureId: number) => {
      try {
        const result = await client
          .from("tier__feature")
          .delete()
          .eq("tier_id", id)
          .eq("feature_id", featureId);
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "deleteTierFeatures");
      }
    },
  };
};

export default prepareServerActions;
