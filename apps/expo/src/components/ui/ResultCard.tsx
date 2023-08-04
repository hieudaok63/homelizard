import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { DotIcon, MessageIcon, SharePostIcon } from "@assets/icons";

import { getTimePost } from "~/utils";
import { AppText } from "./AppText";

type ResultCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  onPress: () => void;
} & HeaderProps &
  FooterProps;

export const ResultCard = (props: ResultCardProps) => {
  const {
    title,
    description,
    imageUrl,
    createdAt,
    onPress,
    onComment,
    onShare,
    onOpenMenu,
    avatar,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="rounded-bt-[0] mx-2 mb-2  overflow-hidden rounded-[20px] rounded-br-[0] bg-white py-4 "
    >
      <Header
        avatar={avatar}
        title={title}
        createdAt={createdAt}
        onOpenMenu={onOpenMenu}
      />
      <View className="">
        <Image
          source={{
            uri: imageUrl,
          }}
          className="h-[400px] w-full bg-grey_2"
          aria-label="Result image"
        />
        <AppText
          text={description || ""}
          style={{ color: "rgba(130, 130, 130, 0.85)" }}
          className="mx-4 mt-1 flex text-sm font-semibold"
        />
      </View>
      <Footer onComment={onComment} onShare={onShare} />
    </TouchableOpacity>
  );
};

type HeaderProps = {
  title: string;
  createdAt: Date;
  avatar?: string;
  onOpenMenu?: () => void;
};

const Header = ({ title, createdAt, avatar, onOpenMenu }: HeaderProps) => {
  const ContemporaryImage = require("@assets/objectStyleImage/Contemporary.png");
  return (
    <View className="w-full flex-row px-4 pb-4">
      <Image
        className="flex h-14 w-14 overflow-hidden rounded-l-full rounded-tr-full bg-grey_2"
        source={avatar || ContemporaryImage}
        transition={300}
        aria-label="Profile picture"
      />
      <View className="mx-4 flex-1 justify-between">
        <AppText text={title} className="flex text-base" numberOfLines={2} />
        <AppText
          text={getTimePost(createdAt)}
          className="mt-1 flex text-xs text-slate-600"
        />
      </View>
      {onOpenMenu && (
        <TouchableOpacity onPress={onOpenMenu} className="flex h-6 w-6">
          <DotIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

type FooterProps = {
  onComment?: () => void;
  onShare?: () => void;
};

const Footer = ({ onComment, onShare }: FooterProps) => {
  if (!onComment || !onShare) {
    return null;
  }
  return (
    <View className="mt-4 flex bg-white px-6 ">
      <View className="flex flex-row">
        {onComment && (
          <TouchableOpacity onPress={onComment} className="mr-6">
            <MessageIcon color="black" fill="black" />
          </TouchableOpacity>
        )}
        {onShare && (
          <TouchableOpacity onPress={onShare}>
            <SharePostIcon color="black" fill="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
