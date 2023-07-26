import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#171717" },
    ]
  }
};

export const decorators = [withBackgrounds];
