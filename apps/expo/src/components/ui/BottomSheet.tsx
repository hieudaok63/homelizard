import * as React from "react";
import {
  Animated,
  Easing,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";

const DEFAULT_HEIGHT = 300;

function useAnimatedBottom(show: boolean, height: number = DEFAULT_HEIGHT) {
  const animatedValue = React.useRef(new Animated.Value(0));

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  React.useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 350,
        // Accelerate then decelerate - https://cubic-bezier.com/#.28,0,.63,1
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false, // 'bottom' is not supported by native animated module
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 250,
        // Accelerate - https://easings.net/#easeInCubic
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return bottom;
}

interface Props {
  children: React.ReactNode;
  show: boolean;
  height?: number;
  onOuterClick?: () => void;
}

export const BottomSheet = ({
  children,
  show,
  height = DEFAULT_HEIGHT,
  onOuterClick,
}: Props) => {
  const { height: screenHeight } = useWindowDimensions();

  const bottom = useAnimatedBottom(show, height);

  return (
    <>
      {show && (
        <Pressable
          onPress={onOuterClick}
          style={{ height: screenHeight }}
          className="bg-black_1 z-1 absolute w-full opacity-50"
        >
          <View />
        </Pressable>
      )}
      <Animated.View
        style={{ height, bottom }}
        className="z-1 absolute w-full rounded-t-3xl bg-white"
      >
        {children}
      </Animated.View>
    </>
  );
};
