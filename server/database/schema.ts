import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
};

export const note = pgTable("note", {
  id: serial().primaryKey(),
  title: text().default("Untitled"),
  content: text().default(""),
  ...timestamps,
});
