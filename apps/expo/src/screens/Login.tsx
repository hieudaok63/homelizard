import React from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useSignIn } from "@clerk/clerk-expo";
import { t } from "i18next";
import { type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Button, TransparentHeaderSafeView } from "~/components/ui";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";
import TextInputController from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";
import { useApplicationLoadingStore } from "~/zustand/store";

// form schema
const formSchema = z.object({
  email: z
    .string()
    .email(t("auth:login.emailInvalid"))
    .min(1, t("auth:login.emailRequired")),
  password: z
    .string()
    .min(1, t("auth:login.passwordRequired"))
    .min(8, t("auth:login.validatePassword")),
});

type FormSchemaType = z.infer<typeof formSchema>;

const Login = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);
  const { t: language } = useTranslation("auth");
  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // functions
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (!isLoaded) {
      return;
    }

    try {
      setLoadingApp(true);
      const result = await signIn.create({
        identifier: data?.email,
        password: data?.password,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        Toast?.show({
          type: "success",
          text1: language("login.loginSuccess"),
          visibilityTime: 5000,
        });
      } else {
        console.log("result in-completed!", result);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      console.log(err);
      Toast?.show({
        type: "error",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        text1: err?.errors?.[0]?.message || "Incorrect email or password",
        visibilityTime: 5000,
      });
    } finally {
      setLoadingApp(false);
    }
  };

  // main return
  return (
    <GradientPatternBackground variant="white">
      <KeyboardAwareScrollView>
        <TransparentHeaderSafeView>
          <View className="h-full w-full px-8 py-4">
            <Text className="mb-8 text-center text-font-18 font-weight_500 text-black opacity-70">
              {language("login.title")}
            </Text>

            <View className="mb-4">
              <TextInputController
                control={control}
                name="email"
                placeholder="E-Mailadresse"
              />
            </View>
            <View className="mb-4">
              <TextInputController
                control={control}
                name="password"
                placeholder={language("login.placeholderPassword")}
                secureTextEntry={true}
              />
            </View>

            <View>
              <Button
                title={language("login.title")}
                className="rounded-3xl"
                onPress={() => {
                  void handleSubmit(onSubmit)();
                }}
              />
            </View>
          </View>
        </TransparentHeaderSafeView>
      </KeyboardAwareScrollView>
    </GradientPatternBackground>
  );
};

export default Login;
