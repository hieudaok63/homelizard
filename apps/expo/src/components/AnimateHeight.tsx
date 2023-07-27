import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { MotiView, useDynamicAnimation } from "moti";

type Props = {
  children?: React.ReactNode;
  /**
   * If `true`, the height will automatically animate to 0. Default: `false`.
   */
  hide?: boolean;
  onHeightDidAnimate?: (height: number) => void;
  /**
   * Defines where the expanded view will be anchored.
   *
   * Default: `top`
   *
   * This prop is untested, use with caution
   */
  initialHeight?: number;
} & React.ComponentProps<typeof MotiView>;

function AnimateHeight({
  children,
  hide = false,
  style,
  delay = Platform.select({ web: 250, default: 0 }),
  transition = { type: "timing", delay },
  onHeightDidAnimate,
  initialHeight = 0,
  ...motiViewProps
}: Props) {
  const measuredHeight = useSharedValue(initialHeight);
  const state = useDynamicAnimation(() => {
    return {
      height: initialHeight,
      opacity: !initialHeight || hide ? 0 : 1,
    };
  });
  if ("state" in motiViewProps) {
    console.warn("[AnimateHeight] state prop not supported");
  }

  useDerivedValue(() => {
    let height = measuredHeight.value;
    if (hide) {
      height = 0;
    }

    state.animateTo({
      height,
      opacity: !height || hide ? 0 : 1,
    });
  }, [hide, measuredHeight]);

  return (
    <MotiView
      {...motiViewProps}
      state={state}
      transition={transition}
      onDidAnimate={
        onHeightDidAnimate &&
        ((key, finished, _, { attemptedValue }) =>
          key == "height" && onHeightDidAnimate(attemptedValue as number))
      }
      style={[styles.hidden, style]}
    >
      <View
        style={[StyleSheet.absoluteFill, styles.autoBottom]}
        onLayout={({ nativeEvent }) => {
          measuredHeight.value = nativeEvent.layout.height;
        }}
      >
        {children}
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  autoBottom: {
    bottom: "auto",
  },
  autoTop: {
    top: "auto",
  },
  hidden: {
    overflow: "hidden",
  },
});

export { AnimateHeight };
