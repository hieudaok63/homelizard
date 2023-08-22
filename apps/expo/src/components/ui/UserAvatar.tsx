import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { Image } from "expo-image";

import { cn } from "@homelizard/tailwind-config/utils";

import { api } from "~/utils/api";
import { AppHeader } from "../AppHeader";

interface UserAvatarProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
  backButton?: boolean;
}

export const UserAvatar = ({
  className,
  style,
  backButton,
}: UserAvatarProps) => {
  const { data } = api.profile.signedProfileImageUrl.useQuery();
  return (
    <View
      style={style}
      className={cn(
        "flex h-[50px] w-[50px] overflow-hidden rounded-l-full rounded-tr-full bg-grey_2",
        className,
      )}
    >
      {backButton && <AppHeader />}

      {data?.url && (
        <Image
          className="h-full w-full"
          source={data.url}
          transition={300}
          aria-label="Profile picture"
        />
      )}
    </View>
  );
};
