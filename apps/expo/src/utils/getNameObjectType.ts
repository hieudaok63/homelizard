import { t } from "i18next";

import {
  type ObjectType as IObjectType,
  type ObjectSelectType,
} from "@homelizard/schema";

export const getNameObjectType = (name: IObjectType) => {
  switch (name) {
    case "apartment_normal":
      return t("search:search.list.apartementNormal");
    case "apartment_maisonette":
      return t("search:search.list.apMaisonette");
    case "apartment_attic":
      return t("search:search.list.attic");
    case "apartment_penthouse":
      return t("search:search.list.penthouse");
    case "apartment_terraced":
      return t("search:search.list.terraced");
    case "apartment_studio":
      return t("search:search.list.studio");
    case "house_detached":
      return t("search:search.list.houseDetached");
    case "house_semi_detached":
      return t("search:search.list.semiDetached");
    case "house_row_corner":
      return t("search:search.list.rowCorner");
    case "house_row_middle":
      return t("search:search.list.rowMiddle");
    case "house_farm":
      return t("search:search.list.farm");
    default:
      return "";
      break;
  }
};
