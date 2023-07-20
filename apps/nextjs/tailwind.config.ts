import type { Config } from "tailwindcss";

import baseConfig from "@homelizard/tailwind-config";

import { shadcnPlugin } from "./src/styles/shadcn-plugin";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  plugins: [shadcnPlugin],
} satisfies Config;
