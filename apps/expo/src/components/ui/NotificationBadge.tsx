import React, { type FC } from "react";
import { Text, View, type StyleProp, type ViewStyle } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

type NotificationBadgeProps = {
  number: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

export const NotificationBadge: FC<NotificationBadgeProps> = ({
  number,
  style,
  className,
}) => {
  return (
    <View
      className={cn(
        "bg-blue_4 h-6 w-6 items-center rounded-full",
        className,
      )}
      style={[style]}
    >
      <Text className="font-weight_700 text-base text-white">{number}</Text>
    </View>
  );
};
