export const useNote = defineStore("note", async () => {
  const notes = await api.note.getAll();
  return { notes };
});
