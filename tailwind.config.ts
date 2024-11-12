import type { Config as TailwindConfig } from "tailwindcss";
import type { Config as DaisyConfig } from "daisyui";

type Config = TailwindConfig & {
  daisyui: DaisyConfig;
};

const primary = {
  "50": "#fff3f1",
  "100": "#ffe6e1",
  "200": "#ffd0c7",
  "300": "#ffb0a0",
  "400": "#ff7053",
  "500": "#f85b3b",
  "600": "#e53f1d",
  "700": "#c13114",
  "800": "#a02c14",
  "900": "#842a18",
  "950": "#481207",
  DEFAULT: "#ff7053",
};

const secondary = {
  "50": "#faf6fe",
  "100": "#f2eafd",
  "200": "#e7d9fb",
  "300": "#d5bbf7",
  "400": "#ae7bed",
  "500": "#a165e7",
  "600": "#8a45d8",
  "700": "#7633bd",
  "800": "#642f9a",
  "900": "#53277c",
  "950": "#36105b",
  DEFAULT: "#ae7bed",
};
const tertiary = {
  "50": "#f0f4ff",
  "100": "#e4eaff",
  "200": "#cdd9ff",
  "300": "#a5b7ff",
  "400": "#7287ff",
  "500": "#3a4dff",
  "600": "#121aff",
  "700": "#010eff",
  "800": "#000bdb",
  "900": "#020ab0",
  "950": "#000d78",
  DEFAULT: "#3a4dff",
};

const twilightTheme = {
  twilight: {
    primary: primary.DEFAULT,
    "primary-focus": primary["600"],
    "primary-content": "#FFE6E1",
    secondary: secondary.DEFAULT,
    "secondary-focus": secondary["600"],
    "secondary-content": "#F3EAFC",
    accent: tertiary.DEFAULT,
    "accent-focus": tertiary["600"],
    "accent-content": "#E4EAFF",
    neutral: primary["200"],
    "neutral-content": "#812B1A",
    "base-100": "#F9FAFB",
    "base-200": "#eceff2",
    "base-300": "#d5dde2",
    "base-content": "#333E47",
    "base-content-focus": "#435362",
  },
};

export default {
  content: ["./app/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      colors: {
        primary,
        secondary,
        tertiary,
      },
    },
  },
  daisyui: {
    themes: [twilightTheme],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
} as Config;
