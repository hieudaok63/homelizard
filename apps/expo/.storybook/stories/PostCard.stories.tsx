import React, { ComponentProps } from "react";
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";

import { ResultCard } from "~/components/ui";

type Props = ComponentProps<typeof ResultCard>;

const meta: Meta<Props> = {
  title: "PostCard",
  component: ResultCard,
  argTypes: {
    onPress: { action: "pressed the card" },
    onShare: { action: "open share" },
    onComment: { action: "open comment" },
    onOpenMenu: { action: "open menu" },
    createdAt: {
      control: "date",
    },
  },
  args: {
    title: "Title",
    description: "Description",
    imageUrl: "/image/object-style/Bohemian.jpg",
    createdAt: new Date("2023-08-01T12:00:00.000Z"),
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
  args: {},
};
