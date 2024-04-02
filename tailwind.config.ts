import type { Config } from "tailwindcss";
import defaultColors from 'tailwindcss/colors';

const colors = {
  primary: "#1f344d",
  secondary: "#60b4e5",
} as const;

export type Colors = typeof colors;
export type DefaultColors = typeof defaultColors;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors
    },
  },
  plugins: [],
};

export default config;
