import { useLocalStorage } from "@vueuse/core";
import type { GetNote } from "~~/server/api/note/[id].get";

export const useNote = defineStore("note", () => {
  const current = useLocalStorage<GetNote>("note", {
    content: "",
    title: "",
  });
  const api = useApi();

  const saving = ref(false);
  const save = async (id: number) => {
    saving.value = true;
    await api.note.save(id, current.value);
    saving.value = false;
  };

  const get = (id: number) =>
    useQuery({
      key: ["note", id],
      query: () => api.note.get(id),
    });

  const getAll = () =>
    useQuery({
      key: ["notes"],
      query: () => api.note.getAll(),
    });

  getAll();
  return { current, saving, save, get, getAll };
});
