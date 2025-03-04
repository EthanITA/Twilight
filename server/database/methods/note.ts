import { eq } from "drizzle-orm";
import { NoteInsert } from "~~/server/database/schema";

export const useNote = () => {
  const table = tables.note;

  async function get(id: number) {
    const cols = { title: table.title, content: table.content };
    return db
      .select(cols)
      .from(table)
      .where(eq(table.id, id))
      .limit(1)
      .then((res) => res[0]);
  }

  async function getAll() {
    const cols = {
      id: table.id,
      title: table.title,
      updatedAt: table.updatedAt,
      createdAt: table.createdAt,
    };
    return db.select(cols).from(table);
  }

  async function save(note: NoteInsert) {
    return db.update(table).set(note).where(eq(table.id, note.id));
  }

  return { get, getAll, save };
};
