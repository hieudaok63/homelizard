import type { ExpoConfig } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_bmF0aW9uYWwtd2hpcHBldC03MS5jbGVyay5hY2NvdW50cy5kZXYk";

const defineConfig = (): ExpoConfig => ({
  name: "homelizard",
  slug: "homelizard",
  owner: "prodactive",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "de.prodactive.homelizard",
  },
  android: {
    package: "de.prodactive.homelizard",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "6f4956c9-276e-4e96-99b0-85bb178e252f",
    },
    CLERK_PUBLISHABLE_KEY,
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_STORYBOOK_ENABLED: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED,
  },
  plugins: [
    "./expo-plugins/with-modify-gradle.js",
    ["expo-image-picker"],
    [
      "expo-document-picker",
      {
        iCloudContainerEnvironment: "Development",
      },
    ],
  ],
});

export default defineConfig;
