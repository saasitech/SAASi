"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const client = createClient(cookieStore);

export async function readPricing() {
  const result = await client.from("pricing").select();
  if (result.error) throw result.error;
  return result.data;
}
export async function readPricingById(id: number) {
  const result = await client.from("pricing").select().eq("id", id).single();
  if (result.error) throw result.error;
  return result.data;
}
export async function readPricingBySlug(slug: string) {
  const result = await client
    .from("pricing")
    .select()
    .eq("slug", slug)
    .single();
  if (result.error) throw result.error;
  return result.data;
}
export async function readDefaultPricing() {
  const result = await client
    .from("pricing")
    .select()
    .eq("isDefault", true)
    .single();
  if (result.error) throw result.error;
  return result.data;
}
export async function createPricing(id: number, input: any) {
  const result = await client.from("pricing").insert(input).select();
  if (result.error) throw result.error;
  return result.data;
}
export async function updatePricing(pricingData: any) {
  const result = await client
    .from("pricing")
    .update(pricingData)
    .eq("id", pricingData.id)
    .select();
  if (result.error) throw result.error;
  return result.data;
}
export async function deletePricing(pricingData: any) {
  const result = await client
    .from("pricing")
    .update(pricingData)
    .eq("id", pricingData.id)
    .select();
  if (result.error) throw result.error;
  return result.data;
}
