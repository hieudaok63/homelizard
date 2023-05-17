import type { RootStackParams } from "./screens/routes";

declare module "react-navigation" {
  interface RootParamList extends RootStackParams {}
}
