import * as schema from "../database/schema";
import {useEnv} from "./env";
import {neon} from "@neondatabase/serverless";
import postgres from "postgres";
import {drizzle as drizzleNeon} from "drizzle-orm/neon-http";
import {drizzle as drizzlePg} from "drizzle-orm/postgres-js";

export type * as Tables from "../database/schema";

export const tables = schema;

const url = useEnv.POSTGRES_URL;
const isDev = useEnv.NODE_ENV === "development";

export const db = isDev
  ? drizzlePg(postgres(url), { schema, casing: "camelCase" })
  : drizzleNeon(neon(url), { schema, casing: "camelCase" });

