"use server";
import dbClient from "@/utils/dbClient";

export async function readPrices() {
  const result = await dbClient.stripeQueryRunner({
    sql: `SELECT * FROM prices`,
  });
  if (!result.success) throw result.error;
  return result.items || [];
}
