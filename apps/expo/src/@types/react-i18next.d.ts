import "i18next"
import type { defaultNS } from "~/utils/i18n";
import type { resources } from "~/@generated/translations";

declare module "i18next" {
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: typeof defaultNS;
    // custom resources type
    resources: (typeof resources)["en"];
  }
}