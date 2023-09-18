import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
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
        black_2: "#262636",
        black_xtra: "#000000",
        blue_1: "#0080FF",
        blue_2: "#007AFF",
        blue_3: "#32A6F9",
        blue_4: "#027FFD",
        blue_5: "#AFD5EB",
        blue_6: "#1252AE",
        brand: "#1F2937",
        dark: "#262636",
        green_2: "#C2E1C1",
        green_1: "#97b54f",
        green: "#37E1EC",
        green_3: "#4CB6AA",
        grey_2: "#A8B7C6",
        grey_3: "#F4F4F4",
        grey_4: "#737D8C",
        grey_5: "#EBEEF2",
        grey: "#787880",
        pink_2: "#E3CDBB",
        pink_3: "#f18fad",
        pink: "#E681A0",
        placeholder: "#828282",
        purple: "#A079EB",
        text_yellow: "#F4B512",
        white: "#FFFFFF",
        blue_rgba: "rgba(18, 82, 174, 0.15)",
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
      height: {
        "height-header": "6rem",
      },
      boxShadow: {
        "4xl": "4px 8px 8px  rgba(0, 0, 0, 0.38)",
        "5xl":
          "0px 0px 15px 0px rgba(255, 255, 255, 0.35) inset, 0px 4px 9px 0px rgba(0, 0, 0, 0.20)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.225s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
