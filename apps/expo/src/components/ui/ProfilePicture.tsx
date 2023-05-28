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

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onPress }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { data } = api.profile.signedProfileImageUrl.useQuery();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...generateBoxShadowStyle({
          xOffset: 3,
          yOffset: 2,
          shadowColorIos: "#000000",
          shadowOpacity: 0.16,
          shadowRadius: 16,
          elevation: 4,
          shadowColorAndroid: "#000000",
        }),
      }}
    >
      <View className="bg-grey_2 flex h-[265px] w-[265px] items-center justify-center overflow-hidden rounded-l-full rounded-tr-full">
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
