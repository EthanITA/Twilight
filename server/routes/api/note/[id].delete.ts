import { z } from "zod";
import { eq } from "drizzle-orm";

const schema = z.object({
  id: z.number(),
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, schema.parse);
  await db.delete(tables.note).where(eq(tables.note.id, id));
  return setResponseStatus(event, 200);
});
