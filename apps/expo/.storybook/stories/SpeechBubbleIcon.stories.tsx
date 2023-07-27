import React, { ComponentProps } from "react";
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";

import { LoveIcon } from "@assets/icons";

import { colorGradients } from "~/utils/colorGradients";
import { SpeechBubbleIcon } from "~/components/ui";

type Props = ComponentProps<typeof SpeechBubbleIcon>;

const meta: Meta<Props> = {
  title: "SpeechBubbleIcon",
  component: SpeechBubbleIcon,
  argTypes: {
    color: {
      control: "radio",
      options: Object.keys(colorGradients),
    },
    children: {
      control: "select",
      options: ["Empty", "LoveIcon"],
      mapping: {
        Empty: null,
        LoveIcon: <LoveIcon />,
      },
    },
  },
  args: {
    color: "blue",
    children: "Empty"
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<Props>;

export const Empty: Story = {
  args: {},
};

export const WithIcon: Story = {
  args: {
    children: "LoveIcon",
  },
};
