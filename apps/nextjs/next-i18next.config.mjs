import path from "path";

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  defaultNS: "common",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",

  localeStructure: "{{lng}}/{{ns}}",
  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  // strictMode: true,
  // serializeConfig: false,
  // react: { useSuspense: false }
};

export default config;
