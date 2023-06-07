import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSignIn } from "@clerk/clerk-expo";
import { type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import SignInWithOAuth from "~/components/auth/SignInWithOAuth";
import { Button } from "~/components/ui";
import TextInput from "~/components/ui/input/TextInput";
import { useZodForm } from "~/hooks/useZodForm";
import { useApplicationLoadingStore } from "~/zustand/store";

// form schema
const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const Login = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

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
      console.log("load failed");
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
          text1: "Login successfully!",
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
        text1: err?.errors?.[0]?.message || "Incorect email or password",
        visibilityTime: 5000,
      });
    } finally {
      setLoadingApp(false);
    }
  };

  // main return
  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-4">
        <SignInWithOAuth />
        <Text className="my-5 text-center text-white">OR</Text>
        <View>
          <View className="mb-4">
            <TextInput
              control={control}
              name="email"
              placeholder="E-Mailadresse"
            />
          </View>
          <View className="mb-4">
            <TextInput
              control={control}
              name="password"
              placeholder="Passwort"
              secureTextEntry={true}
            />
          </View>
          <View>
            <Button
              title="Sign In"
              className="rounded-3xl"
              onPress={() => {
                void handleSubmit(onSubmit)();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
