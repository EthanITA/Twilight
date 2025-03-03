import { z } from "zod";
import { eq } from "drizzle-orm";
import { useAI } from "~~/server/utils/ai";

const schema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
    hint: z.boolean().optional(),
  })
  .optional();

export type PutNoteBody = z.infer<typeof schema>;

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    z.object({
      id: z.coerce.number(),
    }).parse,
  );
  const body = (await readValidatedBody(event, schema.parse)) ?? {};

  await db
    .update(tables.note)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(tables.note.id, id));

  if (body.content && body.hint)
    return useAI()
      .complete(body.content)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((reason) => {
        console.log(reason);
        return "";
      });
  return "";
});
