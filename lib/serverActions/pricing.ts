import { TablesInsert, TablesUpdate } from "@/supabase/types";
import { DbClientType } from "@/utils/supabase/server";
import { errorHandler } from "./common";

const pricingServerActions = (client: DbClientType) => {
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
    readById: errorHandler("Pricing ReadById", async (id: string) => {
      const result = await client
        .from("pricing")
        .select()
        .eq("id", id)
        .single();
      if (result.error) throw result.error;
      return result.data;
    }),
    readDefault: errorHandler("Pricing ReadDefault", async () => {
      const result = await client
        .from("pricing")
        .select()
        .eq("isDefault", true)
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

export default pricingServerActions;
