import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { AppInput, Button } from "~/components/ui";
import { useZodForm } from "~/hooks/useZodForm";
import { type RootStackParams } from "~/screens/routes";
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormSchemaType = z.infer<typeof formSchema>;

export const RegisterEmailPassword = ({ navigation }: IProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useZodForm<FormSchemaType>({
    schema: formSchema,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // functions
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data); // for debug
    navigation?.navigate("RegisterNameSex");
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
            E-Mail und Passwort
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <AppInput
                value={value}
                onChangeText={onChange}
                placeholder="E-Mailadresse"
                className="mt-32"
                error={errors?.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <AppInput
                value={value}
                onChangeText={onChange}
                placeholder="Passwort"
                className="mt-5"
                error={errors?.password?.message}
                secureTextEntry={true}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <AppInput
                value={value}
                onChangeText={onChange}
                placeholder="Passwort"
                className="mt-5"
                error={errors?.confirmPassword?.message}
                secureTextEntry={true}
              />
            )}
          />

          <View className="mt-48 w-full">
            <LinearGradient
              colors={["#F5F7F9", "#ECEEEF"]}
              className="h-3 w-full rounded-t-full"
            />

            <Button
              title="Weiter"
              onPress={handleSubmit(onSubmit)}
              className="rounded-full"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </RegisterLayout>
  );
};
