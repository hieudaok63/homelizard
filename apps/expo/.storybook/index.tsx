import React from "react";
import { getStorybookUI } from "@storybook/react-native";

import ApplicationLoader from "~/ApplicationLoader";
import RootProvider from "~/RootProvider";
import "./storybook.requires";

const StorybookUIRoot = getStorybookUI({});

const StorybookUIApp = () => {
  return (
    <RootProvider>
      <ApplicationLoader>
        <StorybookUIRoot />
      </ApplicationLoader>
    </RootProvider>
  );
};
export default StorybookUIApp;
