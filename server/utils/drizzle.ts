import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../database/schema";
import postgres from "postgres";
import { useEnv } from "~/server/utils/env";

export const tables = schema;
const client = postgres(useEnv.POSTGRES_URL);

export const db = drizzle(client, { schema, casing: "camelCase" });
