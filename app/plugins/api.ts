export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: "/api",
    onRequest({ request, options, error }) {
      options.headers.set("Content-Type", "application/json");
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
