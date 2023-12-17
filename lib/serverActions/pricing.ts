import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { getErrorHandler } from "./common";

const prepareServerActions = (client: DbClientType) => {
  const defaultErrorHandler = getErrorHandler("pricing");

  return {
    read: async () => {
      try {
        const result = await client.from("pricing").select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "read");
      }
    },
    readBySlug: async (slug: string) => {
      try {
        const result = await client
          .from("pricing")
          .select()
          .eq("slug", slug)
          .single();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "readBySlug");
      }
    },
    create: async (input: TablesInsert<"pricing">) => {
      try {
        const result = await client.from("pricing").insert(input).select();
        if (result.error) throw result.error;
        return result.data;
      } catch (err) {
        defaultErrorHandler(err, "create");
      }
    },
    update: async (id: number, input: TablesUpdate<"pricing">) => {
      try {
        const result = await client
          .from("pricing")
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
          .from("pricing")
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
