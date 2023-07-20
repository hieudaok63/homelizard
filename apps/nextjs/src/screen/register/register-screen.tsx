import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSignUp, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider } from "react-hook-form";



import { showAppToast } from "~/utils/toast";
import { RegisterBackground } from "~/assets";
import { Button, DropUpload, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, TextInput } from "~/components";
import { EGender } from "~/enums";
import { useGetUserInfo, useZodForm } from "~/hooks";
import { IRegister } from "~/interfaces";
import { TOptions } from "~/types";
import { registerSchema } from "~/validations";
import { useApplicationLoadingStore } from "~/zustand/store";
import { Layout } from "./_layout";
import { RegisterSignUp } from "./register-signup";


const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const genderOptions: TOptions<number>[] = [
  { value: 1, label: EGender.MALE },
  { value: 2, label: EGender.FEMALE },
  { value: 3, label: EGender.OTHERS },
];

export const RegisterScreen = () => {
  const methods = useZodForm({
    mode: "onSubmit",
    schema: registerSchema,
    defaultValues: initialValues,
  });
  const navigate = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    // navigate.push("register/verify-code");
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
      showAppToast(`Please check email to get code"}`, "success");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigate.push("register/verify-code");
    } catch (error: any) {
      showAppToast(
        `${error?.errors[0]?.message || "Some thing went wrong!"}`,
        "error",
      );
    } finally {
      setLoadingApp(false);
    }
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-register flex-1 justify-center pl-8"
        >
          <RegisterSignUp />
          <div className="mt-14 flex w-full justify-center">
            <Button
              className="w-[80%] bg-gradient-to-l from-[#74ebd5] to-[#9face6]"
              color="white"
              type="submit"
            >
              Continue
            </Button>
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};