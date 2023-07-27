import React, { ComponentProps } from "react";
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";

import { colorGradients } from "~/utils/colorGradients";
import { ButtonActionMain, SpeechBubbleIcon } from "~/components/ui";
import { GoogleDriveIcon, LoveIcon } from "@assets/icons";

type Props = ComponentProps<typeof ButtonActionMain>;

const meta: Meta<Props> = {
  title: "ButtonActionMain",
  component: ButtonActionMain,
  argTypes: {
    onPress: { action: "pressed the button" },
    description: { control: "text" },
    progress: { control: "number", range: true, min: 0, max: 100, step: 10 },
    variant: {
      control: "radio",
      options: Object.keys(colorGradients),
    },
    IconLeftProps: {
      control: "select",
      options: ["Empty", "SpeechBubbleLoveIcon", "CustomIcon"],
      mapping: {
        Empty: null,
        SpeechBubbleLoveIcon: <LoveIcon />,
        CustomIcon: <GoogleDriveIcon />
      },
    },
    noSpeechBubbleIcon: {
      control: "boolean",
    },
    isButton: {
      control: "boolean",
    }
  },
  args: {
    title: "Hello world",
    variant: "yellow",
    IconLeftProps: "SpeechBubbleLoveIcon",
    noSpeechBubbleIcon: false,
  },
  decorators: [
    (Story) => (
      <View className="flex-1 items-center justify-center p-10">
        <Story />
      </View>
    ),
  ],
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<Props>;

export const Basic: Story = {
  storyName: "Basic",
  args: {
  },
};

export const WithProgress: Story = {
  args: {
    progress: 50,
  },
};

export const CustomIcon: Story = {
  args: {
    progress: 50,
    IconLeftProps: "CustomIcon",
    noSpeechBubbleIcon: true,
  },
};
