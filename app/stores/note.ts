import { useLocalStorage } from "@vueuse/core";
import type { GetNote } from "~~/server/api/note/[id].get";
import type { GetAllNotes } from "~~/server/api/note/index.get";

export const useNote = defineStore("note", () => {
  const current = useLocalStorage<GetNote>("note", {
    content: "",
    title: "",
  });
  const data = ref<GetAllNotes>([]);

  const saving = ref(false);
  const save = async (id: number) => {
    saving.value = true;
    await $fetch(`/api/note/${id}`, {
      method: "PUT",
      body: current.value,
    });
    saving.value = false;
  };

  const get = (id: number) =>
    $fetch<GetNote>(`/api/note/${id}`).then((res) => (current.value = res));

  const getAll = () =>
    $fetch<GetAllNotes>("/api/note").then((res) => (data.value = res));
  {
    getAll();
  }
  return { current, data, saving, save, get, getAll };
});
