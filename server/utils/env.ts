import { z } from "zod";

export const useEnv = z
  .object({
    NUXT_PROGRES_URL: z.string(),
  })
  .passthrough()
  .parse(process.env);
