import { z } from "zod";

const schema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type PostNoteBody = z.infer<typeof schema>;

export default defineEventHandler(async (event) => {
  const { content, title } = await readValidatedBody(event, schema.parse);
  await db.insert(tables.note).values({
    content,
    title,
  });
  return setResponseStatus(event, 201);
});
