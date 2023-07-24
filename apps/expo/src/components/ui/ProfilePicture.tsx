import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";
import { Image } from "expo-image";

import CameraIcon from "@assets/icons/CameraIcon.svg";

import { api } from "~/utils/api";
import { generateBoxShadowStyle } from "~/utils/helpers";

type ProfilePictureProps = {
  onPress?: () => void;
};

export const styleBoxShadow = generateBoxShadowStyle("shadowPicture");

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onPress }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { data } = api.profile.signedProfileImageUrl.useQuery();

  return (
    <TouchableOpacity onPress={onPress} style={styleBoxShadow}>
      <View className="flex h-[265px] w-[265px] items-center justify-center overflow-hidden rounded-l-full rounded-tr-full bg-grey_2">
        {data?.url && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            className="h-full w-full"
            source={data.url}
            transition={300}
            accessibilityLabel="Profile picture"
            onLoadEnd={() => setIsImageLoaded(true)}
          />
        )}
        {!isImageLoaded && (
          <Animated.View
            className="absolute z-10"
            exiting={FadeOut.duration(1000)}
          >
            <CameraIcon height={48} width={48} />
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfilePicture;
