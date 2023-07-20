import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";



import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";

import { api } from "~/utils/api";
import { AppToast } from "~/components";
import nextI18nConfig from "../../next-i18next.config.mjs";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      <AppToast />
    </ClerkProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
const TRPCApp = api.withTRPC(I18nApp);

export default TRPCApp;