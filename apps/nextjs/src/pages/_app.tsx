import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { appWithTranslation } from "next-i18next";
import NextTopLoader from "nextjs-toploader";

import { api } from "~/utils/api";
import { AppToast } from "~/components";
import nextI18nConfig from "../../next-i18next.config.mjs";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <NextTopLoader color="#1252AE" />
      <Component {...pageProps} />
      <AppToast />
    </ClerkProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
const TRPCApp = api.withTRPC(I18nApp);

export default TRPCApp;
