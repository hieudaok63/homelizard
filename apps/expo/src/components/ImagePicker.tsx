import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import React from "react";

import { api } from "~/utils/api";
import ProfilePicture from "./ui/ProfilePicture";

const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

const pickImage = async () => {
  const imagePickResult = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (imagePickResult.canceled || imagePickResult.assets.length === 0) {
    return null;
  }
  return imagePickResult.assets[0];
};


const ImagePicker = () => {
  const trpc = api.useContext();

  const uploadProfilePicture = async () => {
    const image = await pickImage();
    if (!image) {
      return;
    }
    const imageBlob = await getBlob(image.uri);

    const { url } = await trpc.client.profile.signUploadUrl.query({
      fileSize: imageBlob.size,
    });

    await fetch(url, {
      method: "PUT",
      body: imageBlob,
    });
    await trpc.profile.signedProfileImageUrl.invalidate();
  };

  return (
      <ProfilePicture onPress={uploadProfilePicture} />
  );
};

export default ImagePicker;
