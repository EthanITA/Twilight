import { z } from "zod";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    z.object({
      id: z.number(),
    }).parse,
  );
  const { content, title } = await readValidatedBody(event, schema.parse);

  await db
    .update(tables.note)
    .set({
      content,
      title,
      updatedAt: new Date(),
    })
    .where(eq(tables.note.id, id));

  setResponseStatus(event, 200);
});
