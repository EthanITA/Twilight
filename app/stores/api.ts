import note from "~/services/note";

export const useApi = defineStore("query", () => {
  const online = ref(window.navigator.onLine);
  window.addEventListener("online", () => (online.value = true));
  window.addEventListener("offline", () => (online.value = false));
  return { online, note };
});
