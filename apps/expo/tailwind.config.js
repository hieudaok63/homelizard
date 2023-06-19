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
        "nunito-800": ["Nunito_800ExtraBold"],
        "nunito-bold-italic": ["Nunito_700Bold_Italic"],
      },
      colors: {
        // brand color dark grey
        bg_home: "#F5F5F5",
        black_1: "#262332",
        black_xtra: "#000000",
        blue_1: "#0080FF",
        blue_2: "#007AFF",
        blue_3: "#32A6F9",
        blue_4: "#027FFD",
        blue_5: "#AFD5EB",
        brand: "#1F2937",
        dark: "#262636",
        green_2: "#C2E1C1",
        green: "#37E1EC",
        grey_2: "#A8B7C6",
        grey_3: "#F4F4F4",
        grey: "#787880",
        pink_2: "#E3CDBB",
        pink: "#E681A0",
        placeholder: "#828282",
        purple: "#A079EB",
        text_yellow: "#F4B512",
        white: "#FFFFFF",
      },
      fontSize: {
        "font-8": "8px",
        "font-12": "12px",
        "font-13": "13px",
        "font-14": "14px",
        "font-15": "15px",
        "font-16": "16px",
        "font-18": "18px",
        "font-17": "17px",
        "font-24": "24px",
        "font-28": "28px",
        "font-32": "32px",
        "font-45": "45px",
      },
      fontWeight: {
        weight_200: "200",
        weight_300: "300",
        weight_400: "400",
        weight_500: "500",
        weight_600: "600",
        weight_700: "700",
        weight_800: "800",
      },
      borderColor: {
        color_gray: "rgba(0, 0, 0, 0.12)",
        color_black: "rgba(0, 0, 0, 0.2)",
        color_green: "#37E1EC",
      },
    },
  },
};

module.exports = config;
