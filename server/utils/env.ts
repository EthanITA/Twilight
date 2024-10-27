import { z } from "zod";

export const useEnv = z
  .object({
    POSTGRES_URL: z.string(),
  })
  .passthrough()
  .parse(process.env);
