import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["shadcn-nuxt", "@nuxthub/core"],
  compatibilityDate: "2025-04-07",
  devtools: { enabled: true, telemetry: false },
  ssr: false,
  nitro: { experimental: { websocket: true } },
  css: ["~/assets/css/tailwind.css"],
  future: { compatibilityVersion: 4 },
  vite: { plugins: [tailwindcss()] },
  shadcn: { componentDir: "./app/components/ui" },
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
});