import { z } from "zod";

export const useEnv = () =>
  z
    .object({
      POSTGRES_URL: z.string(),
      CF_GATEWAY_URL: z.string(),
      CF_GATEWAY_API_KEY: z.string(),
      OPENAI_API_KEY: z.string(),
      GOOGLE_CLIENT_ID: z.string(),
      GOOGLE_CLIENT_SECRET: z.string(),
    })
    .passthrough()
    .parse(process.env);
