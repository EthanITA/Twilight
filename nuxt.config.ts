// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [
        {
          href: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap",
          rel: "preload",
          as: "style",
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxthub/core", "@pinia/nuxt", "@nuxt/ui"],
  ssr: false,
  ui: {
    colorMode: false
  }
});
