import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp(),
};

export const note = pgTable("note", {
  id: serial().primaryKey(),
  title: text().default("Untitled"),
  content: text().default(""),
  ...timestamps,
});

export type Note = typeof note.$inferInsert;
export type NoteInsert = typeof note.$inferSelect;
