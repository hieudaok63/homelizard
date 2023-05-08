import type { RootStackParams } from "./screens/routes";

declare module "react-navigation" {
  interface RootParamList extends RootStackParams {}
}

// Allows import of .svg files as React components
declare module "*.svg" {
  import type React from "react";
  import { type SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}