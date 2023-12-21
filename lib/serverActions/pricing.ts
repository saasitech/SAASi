import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { errorHandler } from "./common";

const prepareServerActions = (client: DbClientType) => {
  return {
    read: errorHandler("Pricing Read", async () => {
      const result = await client.from("pricing").select();
      if (result.error) throw result.error;
      return result.data;
    }),
    readBySlug: errorHandler("Pricing ReadBySlug", async (slug: string) => {
      const result = await client
        .from("pricing")
        .select()
        .eq("slug", slug)
        .single();
      if (result.error) throw result.error;
      return result.data;
    }),
    create: errorHandler(
      "Pricing Create",
      async (input: TablesInsert<"pricing">) => {
        const result = await client.from("pricing").insert(input).select();
        if (result.error) throw result.error;
        return result.data;
      }
    ),
    update: errorHandler(
      "Pricing Update",
      async (id: number, input: TablesUpdate<"pricing">) => {
        const result = await client
          .from("pricing")
          .update(input)
          .eq("id", id)
          .select();
        if (result.error) throw result.error;
        return result.data;
      }
    ),
    delete: errorHandler("Pricing Delete", async (id: number) => {
      const result = await client
        .from("pricing")
        .delete()
        .eq("id", id)
        .select();
      if (result.error) throw result.error;
      return result.data;
    }),
  };
};

export default prepareServerActions;
