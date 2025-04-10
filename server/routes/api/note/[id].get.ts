import { z } from "zod";
import { eq } from "drizzle-orm";

const schema = z.object({
  id: z.coerce.number(),
});

export type GetNote = {
  title: string;
  content: string;
};

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, schema.parse);
  return db
    .select({
      title: tables.note.title,
      content: tables.note.content,
    })
    .from(tables.note)
    .where(eq(tables.note.id, id))
    .limit(1)
    .then((res) => res[0]);
});
