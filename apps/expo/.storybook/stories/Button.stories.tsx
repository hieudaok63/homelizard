import React, { ComponentProps } from "react";
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";

import { Button } from "~/components/ui";

type Props = ComponentProps<typeof Button>;

const meta: Meta<Props> = {
  title: "Button",
  component: Button,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    title: "Hello world",
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

export const Basic: Story = {
  storyName: "Basic",
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    title: "Another example",
    disabled: true,
  },
};
