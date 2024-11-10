import { z } from "zod";
import { Note } from "~/server/database/schema";

const schema = z.object({
  id: z.number().optional(),
});
export type GetAllNotes = Pick<
  Note,
  "id" | "title" | "updatedAt" | "createdAt"
>[];

export default defineEventHandler(async (event) => {
  return db
    .select({
      id: tables.note.id,
      title: tables.note.title,
      updatedAt: tables.note.updatedAt,
      createdAt: tables.note.createdAt,
    })
    .from(tables.note);
});
