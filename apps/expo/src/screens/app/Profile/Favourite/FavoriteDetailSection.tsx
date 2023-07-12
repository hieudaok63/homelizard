import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";
import { LayoutFavorite } from "./_layoutFavorite";

export const FavoriteDetailSection = () => {
  const [showListOption, setShowListOption] = useState(true);

  const navigation = useAppNavigation();

  return (
    <LayoutFavorite>
      <KeyboardAwareScrollView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="pb-3 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <ButtonActionMain
          onPress={() => setShowListOption((pre) => !pre)}
          title="Haus"
          IconLeftProps
          variant="turquoise"
          progress={54}
          description="Einfamilienhaus, München"
          isProgressbar
          IconRightProps={
            showListOption ? (
              <ArrowUpIcon color="white" width={24} height={24} />
            ) : (
              <ArrowDownIcon fill="#000000" />
            )
          }
          onPressIconRight={() => setShowListOption((pre) => !pre)}
          styleBoxShadowBtn={true}
          classButton={cn(
            "rounded-none",
            showListOption ? "rounded-t-[40px]" : "rounded-full",
          )}
          activeOpacity={0.8}
        />

        <BottomNavBarPadding />
      </KeyboardAwareScrollView>
    </LayoutFavorite>
  );
};
