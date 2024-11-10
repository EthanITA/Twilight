import { z } from "zod";
import { eq } from "drizzle-orm";

const schema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const { id, content, title } = await readValidatedBody(event, schema.parse);
  if (id) {
    await db
      .update(tables.note)
      .set({
        content,
        title,
        updatedAt: new Date(),
      })
      .where(eq(tables.note.id, id));
    return setResponseStatus(event, 200);
  } else {
    await db.insert(tables.note).values({
      content,
      title,
    });
    return setResponseStatus(event, 201);
  }
});
