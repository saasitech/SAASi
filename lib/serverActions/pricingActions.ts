"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import ShortUniqueId from "short-unique-id";
import { BillingOptions, TierItem } from "../types";

const uid = new ShortUniqueId({ length: 10 });

export async function readPricing() {
  const client = createClient(cookies());
  const result = await client.from("pricing").select();
  if (result.error) throw result.error;
  return result.data || [];
}
export async function readPricingById(id) {
  const client = createClient(cookies());
  const result = await client.from("pricing").select().eq("id", id).single();
  if (result.error) throw result.error;
  return result.data || [];
}
export async function readPricingBySlug(slug: string) {
  const client = createClient(cookies());
  const result = await client
    .from("pricing")
    .select()
    .eq("slug", slug)
    .single();
  if (result.error) throw result.error;
  return result.data || [];
}
export async function readDefaultPricing() {
  const client = createClient(cookies());
  const result = await client
    .from("pricing")
    .select()
    .eq("isDefault", true)
    .single();
  if (result.error) throw result.error;
  return result.data;
}
export async function createPricing(pricingData: any) {
  delete pricingData.id;
  pricingData.slug = uid.rnd();
  const client = createClient(cookies());
  const result = await client
    .from("pricing")
    .insert(pricingData)
    .select()
    .single();
  await handleDefaultPricing(pricingData);
  if (result.error) throw result.error;
  revalidatePath("/admin");
  return result.data;
}
export async function updatePricing(pricingData: any) {
  pricingData.updatedAt = new Date();
  const client = createClient(cookies());
  const result = await client
    .from("pricing")
    .update(pricingData)
    .eq("id", pricingData.id)
    .select()
    .single();
  await handleDefaultPricing(pricingData);
  if (result.error) throw result.error;
  revalidatePath("/admin");
  return result.data;
}
export async function deletePricing(pricingData: any) {
  const client = createClient(cookies());
  const result = await client
    .from("pricing")
    .update(pricingData)
    .eq("id", pricingData.id)
    .select();
  revalidatePath("/admin");
  if (result.error) throw result.error;
  return result.data;
}

const handleDefaultPricing = async (pricingData: any) => {
  if (pricingData.isDefault) {
    const client = createClient(cookies());
    const result = await client
      .from("pricing")
      .update({ isDefault: false })
      .neq("id", pricingData.id);
    if (result.error) throw result.error;
  }
};
