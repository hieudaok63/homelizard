// import { type Config } from "tailwindcss";

// import baseConfig from "@homelizard/tailwind-config";

// export default {
//   presets: [baseConfig],
//   content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
// } satisfies Config;

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito_400Regular"],
        "nunito-italic": ["Nunito_400Regular_Italic"],
        "nunito-bold": ["Nunito_700Bold"],

        "nunito-bold-italic": ["Nunito_700Bold_Italic"],
      },
      colors: {
        // brand color dark grey
        brand: "#1F2937",
      },
    },
  },
};

module.exports = config;
