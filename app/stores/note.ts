import type { Note } from "~~/server/database/schema";

export const useNote = defineStore("note", () => {
  const noteApi = useApi(() => api.note.getAll());

  return { noteApi };
});
