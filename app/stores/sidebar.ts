import { apps } from "~/const/sidebar";

export const useSidebar = defineStore("sidebar", () => {
  const route = useRoute();
  const currentApp = computed(() => {
    return apps.find((app) => route.path.startsWith(app.link));
  });
  return {
    currentApp,
    apps,
  };
});
