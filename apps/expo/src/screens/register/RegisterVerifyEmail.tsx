import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useSignUp } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui";
import TextInput from "~/components/ui/input/TextInput";
import { useZodForm } from "~/hooks/useZodForm";
import { type RootStackParams } from "~/screens/routes";
import { useApplicationLoadingStore } from "~/zustand/store";
import { RegisterLayout } from "./_layout";

// types
type IProps = NativeStackScreenProps<RootStackParams, "RegisterVerifyEmail">;

// form schema
const formSchema = z.object({
  code: z.string().min(4, "Please enter a valid code"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const RegisterVerifyEmail = ({}: IProps) => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      code: "",
    },
  });

  // functions
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (!isLoaded) {
      console.log("load failed");
      return;
    }

    try {
      setLoadingApp(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data?.code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      Toast?.show({
        type: "success",
        text1: "Account Created",
        visibilityTime: 5000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Toast?.show({
        type: "error",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        text1: err?.errors?.[0]?.message || "The code you entered is incorect",
        visibilityTime: 5000,
      });
    } finally {
      setLoadingApp(false);
    }
  };

  // main return
  return (
    <RegisterLayout>
      <KeyboardAwareScrollView>
        <View className="h-full w-full px-5 pb-14">
          <Text className="font-nunito-800 text-dark text-lg">
            Login : Registrierung
          </Text>
          <Text className="font-nunito-800 text-dark pl-16 text-lg">
            Verify your E-Mail
          </Text>

          <TextInput
            control={control}
            name="code"
            placeholder="6-digits code"
            className="mt-32"
          />

          <View className="mt-3 w-full">
            <Button
              title="Verify"
              onPress={() => {
                void handleSubmit(onSubmit)();
              }}
              className="rounded-full"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </RegisterLayout>
  );
};
