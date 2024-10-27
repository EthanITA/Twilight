import { z } from "zod";

export const useEnv = z
  .object({
    PROGRES_URL: z.string(),
  })
  .passthrough()
  .parse(process.env);
