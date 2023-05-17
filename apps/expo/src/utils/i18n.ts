import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "~/@generated/translations";

export const defaultNS = "common";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    lng: getLocales()[0]?.languageCode,
    defaultNS,
    resources,
    interpolation: {
      escapeValue: false, // react already saves from xss => https://www.i18next.com/translation-function/interpolation#unescape, // not needed for react
    },
  });

export default i18n;
