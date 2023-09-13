import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import { useAssets } from "expo-asset";

interface LoggedInSplashProps {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  goToScreen: () => void;
}
const widthScreen = Dimensions.get("window").width;
export const LoadingSpinner = ({
  setImageLoaded,
  goToScreen,
}: LoggedInSplashProps) => {
  const [logoApp] = useAssets([require("../../../../assets/LogoApp.png")]);
  const [lizardWiggleUnscreen] = useAssets([
    require("../../../../assets/lizardWiggleUnscreen.gif"),
  ]);
  useEffect(() => {
    setImageLoaded(true);
  }, []);
  const moveTopLizardWiggleUnscreen = useRef(new Animated.Value(-200)).current;

  const moveBottomLizardWiggleUnscreen = useRef(
    new Animated.Value(-200),
  ).current;
  //
  const moveLogoApp = useRef(new Animated.Value(-widthScreen)).current;
  //
  const moveLeftText = useRef(new Animated.Value(0)).current;
  const opacityLeftText = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveLeftText, {
        duration: 2000,
        toValue: widthScreen,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(opacityLeftText, {
        duration: 0,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.timing(moveLogoApp, {
        duration: 1000,
        toValue: widthScreen / 5,
        delay: 0,
        useNativeDriver: false,
      }).start(() => {
        Animated.sequence([
          Animated.timing(moveBottomLizardWiggleUnscreen, {
            duration: 3000,
            toValue: widthScreen,
            delay: 200,
            useNativeDriver: false,
          }),
          Animated.timing(moveTopLizardWiggleUnscreen, {
            duration: 3000,
            toValue: widthScreen,
            delay: 0,
            useNativeDriver: false,
          }),
        ]).start(() => goToScreen());
      });
    });
  }, [
    moveLeftText,
    opacityLeftText,
    moveLogoApp,
    moveBottomLizardWiggleUnscreen,
    moveTopLizardWiggleUnscreen,
  ]);

  if (!logoApp || !lizardWiggleUnscreen) return null;
  return (
    <View className="flex-1 pt-20">
      <Animated.Text
        className={
          "nunito mt-40 w-[55%] self-center text-center text-2xl font-bold text-[#000]"
        }
        style={{ marginRight: moveLeftText, opacity: opacityLeftText }}
      >
        this screen is an example for any action that requires a loading spinner
      </Animated.Text>

      <Animated.View
        className={"absolute top-96"}
        style={{ right: moveLogoApp }}
      >
        <Image
          source={logoApp[0] as ImageSourcePropType}
          className="w-full"
          resizeMode={"contain"}
        />
        <Text
          className={"text-center text-2xl font-light"}
          style={{ color: "rgba(38, 35, 50, 0.60)" }}
        >
          Wir finden deine Immobilie
        </Text>
      </Animated.View>
      <Animated.View
        className={"absolute top-[-60px]"}
        style={{
          right: moveTopLizardWiggleUnscreen,
        }}
      >
        <Image
          source={lizardWiggleUnscreen[0] as ImageSourcePropType}
          className="w-56"
          style={{ transform: [{ rotate: "180 deg" }] }}
        />
      </Animated.View>
      <Animated.View
        className={"absolute bottom-0 w-full"}
        style={{
          marginLeft: moveBottomLizardWiggleUnscreen,
        }}
      >
        <Image
          source={lizardWiggleUnscreen[0] as ImageSourcePropType}
          className="w-56"
        />
      </Animated.View>
    </View>
  );
};
