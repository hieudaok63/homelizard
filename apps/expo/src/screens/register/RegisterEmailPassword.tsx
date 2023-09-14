import { useSignUp } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { StepProgressButton } from "~/components/ui";
import TextInput from "~/components/ui/input/TextInputController";
import { useZodForm } from "~/hooks/useZodForm";
import { type RootStackParams } from "~/screens/RootStackParams";
import { useApplicationLoadingStore } from "~/zustand/store";
import { RegisterLayout } from "./_layout";

// types
type IProps = NativeStackScreenProps<RootStackParams, "RegisterEmailPassword">;

// form schema
const formSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    verifyPassword: z
      .string()
      .min(4, "Please enter a valid code")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const RegisterEmailPassword = ({ navigation }: IProps) => {
  const { isLoaded, signUp } = useSignUp();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

  const { handleSubmit, control } = useZodForm({
    schema: formSchema,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      verifyPassword: "",
    },
  });

  // functions
  const onSubmit = handleSubmit(async (data) => {
    if (!isLoaded) {
      console.log("load failed");
      return;
    }

    try {
      setLoadingApp(true);
      await signUp.create({
        emailAddress: data?.email,
        password: data?.password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigation?.navigate("RegisterVerifyEmail");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      console.log(err);
      Toast?.show({
        type: "error",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        text1: err?.errors?.[0]?.message || "Cannot create your account",
        visibilityTime: 5000,
      });
    } finally {
      setLoadingApp(false);
    }
  });

  // main return
  return (
    <RegisterLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex h-full justify-between px-6"
      >
        <View>
          <Text className="font-nunito-800 text-lg text-dark">
            Login : Registrierung
          </Text>
          <Text className="pl-16 font-nunito-800 text-lg text-dark">
            E-Mail und Passwort
          </Text>
        </View>

        <View className="flex">
          <TextInput
            variant="flex"
            autoCapitalize="none"
            name="email"
            control={control}
            placeholder="E-Mailadresse"
          />
          <View className="h-6"/>
          <TextInput
            variant="flex"
            name="password"
            control={control}
            placeholder="Passwort"
            secureTextEntry
          />
           <View className="h-6"/>
          <TextInput
            variant="flex"
            name="confirmPassword"
            control={control}
            placeholder="Passwort bestätigen"
            secureTextEntry
          />
        </View>
        <View>
          <StepProgressButton
            progress={60}
            title="Weiter"
            onPress={onSubmit}
            variant="turquoise"
          />
        </View>
      </KeyboardAvoidingView>
    </RegisterLayout>
  );
};
