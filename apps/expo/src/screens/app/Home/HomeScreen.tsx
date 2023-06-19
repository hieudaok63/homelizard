import React from "react";

import { type AppNavigationProps } from "~/components/navigation/useAppNavigation";
import { ContentHome } from "./ContentHome";
import { HeaderHome } from "./HeaderHome";
import { HomeLayout } from "./_layout";

export function HomeScreen({ navigation }: AppNavigationProps<"Home">) {
  return (
    <HomeLayout>
      <HeaderHome />
      <ContentHome />
    </HomeLayout>
  );
}
