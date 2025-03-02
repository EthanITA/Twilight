export const useStatus = defineStore("status", () => {
  const bgLoading = ref<any[]>([]);
  const bgLoadingStatus = computed(() => {
    if (bgLoading.value.length > 0) {
      return true;
    }
  });
  const setBgLoading = () => {
    bgLoading.value.push({});
  };
  const unsetBgLoading = () => {
    bgLoading.value.pop();
  };

  return {
    bgLoading: computed(() => bgLoading.value.length > 0),
    setBgLoading,
    unsetBgLoading,
  };
});
