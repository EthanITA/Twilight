import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["@nuxthub/core", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true, telemetry: false },
  vite: { plugins: [tailwindcss()] },
  nitro: { experimental: { websocket: true, openAPI: true } },
  compatibilityDate: "2025-04-07",
  ssr: false,
  future: { compatibilityVersion: 4 },
  components: [{ path: "~/components/ui" }, { path: "~/components" }],
});
