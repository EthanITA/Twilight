import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../database/schema";
import postgres from "postgres";
import { useEnv } from "~/server/utils/env";

export const tables = schema;
const client = postgres(useEnv.NUXT_PROGRES_URL);

export function useDrizzle() {
  return drizzle(client, { schema, casing: "snake_case" });
}
