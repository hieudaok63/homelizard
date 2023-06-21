import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { DetailContentPost } from "./ui/Post/DetailContentPost";
import { FooterPost } from "./ui/Post/FooterPost";
import { HeaderPost } from "./ui/Post/HeaderPost";

interface PostProps {
  title: string;
  timeCreate: string;
  onPress?: () => void;
  onComment?: () => void;
  onSharePost?: () => void;
  imageLink: string;
  desc: string;
  name: string;
  action?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const PostComponent = ({
  timeCreate,
  title,
  desc,
  imageLink,
  name,
  action = true,
  className,
  style,
}: PostProps) => {
  return (
    <View style={style} className={className}>
      <HeaderPost title={title} name={name} timeCreate={timeCreate} />
      <DetailContentPost imageLink={imageLink} />
      <FooterPost desc={desc} action={action} />
    </View>
  );
};

export default PostComponent;
