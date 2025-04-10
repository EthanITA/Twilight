import { z } from "zod";

const schema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .optional();

export type PostNoteBody = z.infer<typeof schema>;

export default defineEventHandler(async (event) => {
  const { content, title } =
    (await readValidatedBody(event, schema.parse)) ?? {};
  setResponseStatus(event, 201);
  return db
    .insert(tables.note)
    .values({
      content,
      title,
    })
    .returning({ id: tables.note.id })
    .then((res) => res[0]!);
});
