import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp(),
};

export const note = pgTable("note", {
  id: serial().primaryKey().notNull(),
  title: text().default("Untitled").notNull(),
  content: text().default("").notNull(),
  ...timestamps,
});

export type Note = typeof note.$inferInsert;
export type NoteI = typeof note.$inferSelect;
export const noteSchema = createInsertSchema(note);
