import React, { type PropsWithChildren } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { MotiView } from "moti";

import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import { generateBoxShadowStyle } from "~/utils/helpers";
import { AnimateHeight } from "~/components/AnimateHeight";
import { ButtonActionMain, type Percentage } from "~/components/ui";
import { useToggle } from "~/hooks/useToggle";

const styleBoxShadow = generateBoxShadowStyle("shadowBtn");

type ProfileSectionProps = PropsWithChildren<{
  title: string;
  description?: string;
  progress: Percentage;
  variant: ColorGradientVariant;
  style?: StyleProp<ViewStyle>;
}>;

export const ProfileSectionAccordion = ({
  title,
  description,
  progress,
  variant,
  style,
  children,
}: ProfileSectionProps) => {
  const [showList, toggleShowList] = useToggle();
  return (
    <View
      className="mt-8 flex-col overflow-hidden rounded-[32px] bg-white"
      style={[styleBoxShadow, style]}
    >
      <ButtonActionMain
        onPress={toggleShowList}
        title={title}
        variant={variant}
        progress={progress}
        description={description}
        IconRightProps={
          <MotiView
            animate={{
              rotate: showList ? "0deg" : "180deg",
            }}
            transition={{
              type: "timing",
            }}
          >
            <ArrowUpIcon color="white" width={24} height={24} />
          </MotiView>
        }
        classTitleButton="font-nunito-bold"
      />
      <AnimateHeight hide={!showList}>{children}</AnimateHeight>
    </View>
  );
};
