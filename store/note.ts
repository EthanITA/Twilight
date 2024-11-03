import { useLocalStorage } from "@vueuse/core";

export const useNote = defineStore("note", () => {
  const data = useLocalStorage("note", {
    content: "",
    title: "",
  });
  const saving = ref(false);
  const save = async () => {
    saving.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    saving.value = false;
  };
  return { data, saving, save };
});
