import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

import ApplicationLoader from "~/ApplicationLoader";
import RootProvider from "~/RootProvider";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./src/app");
  return (
    <RootProvider>
      <ApplicationLoader>
        <ExpoRoot context={ctx} />
      </ApplicationLoader>
    </RootProvider>
  );
}

registerRootComponent(App);
