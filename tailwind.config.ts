import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f6f7f4",
          100: "#e8ebe3",
          200: "#d2d7c7",
          300: "#b3bca3",
          400: "#94a07e",
          500: "#778563",
          600: "#5d6a4d",
          700: "#49533f",
          800: "#3c4435",
          900: "#343b2e",
          950: "#1a1f17",
        },
        terracotta: {
          50: "#faf6f4",
          100: "#f3e8e2",
          200: "#e6cfc2",
          300: "#d5af9a",
          400: "#c48b70",
          500: "#b67255",
          600: "#a8604a",
          700: "#8c4d3f",
          800: "#724139",
          900: "#5e3832",
          950: "#321c18",
        },
        cream: {
          50: "#fefdfb",
          100: "#fdf9f2",
          200: "#fbf2e1",
          300: "#f7e8c9",
          400: "#f2d9a8",
          500: "#ecc787",
          600: "#e3af64",
          700: "#d6933f",
          800: "#c27a33",
          900: "#a1652d",
          950: "#82522a",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
