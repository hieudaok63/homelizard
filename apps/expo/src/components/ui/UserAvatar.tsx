import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { Image } from "expo-image";

import { cn } from "@homelizard/tailwind-config/utils";

import { api } from "~/utils/api";

interface UserAvatarProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const UserAvatar = ({ className, style }: UserAvatarProps) => {
  const { data } = api.profile.signedProfileImageUrl.useQuery();
  return (
    <View
      style={style}
      className={cn(
        "bg-grey_2 flex h-[50px] w-[50px] overflow-hidden rounded-l-full rounded-tr-full",
        className,
      )}
    >
      {data?.url && (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
          className="h-full w-full"
          source={data.url}
          transition={300}
          accessibilityLabel="Profile picture"
        />
      )}
    </View>
  );
};
