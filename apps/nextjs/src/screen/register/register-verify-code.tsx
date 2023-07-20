import React from "react";
import { useRouter } from "next/router";
import { useSignUp } from "@clerk/nextjs";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button, TextInput } from "~/components";
import { useGetUserInfo, useZodForm } from "~/hooks";
import { verifyCodeSchema } from "~/validations";
import { useApplicationLoadingStore } from "~/zustand/store";
import { Layout } from "./_layout";

type FormSchemaType = z.infer<typeof verifyCodeSchema>;

export const RegisterVerifyCode = () => {
  const navigate = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

  const { control, handleSubmit } = useZodForm({
    mode: "onSubmit",
    schema: verifyCodeSchema,
    defaultValues: { code: "" },
  });

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
      console.log(completeSignUp);
      navigate.push("name-gender");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoadingApp(false);
    }
  };
  //   useGetUserInfo();

  return (
    <Layout title="Code überprüfen">
      <form
        className="form-register w-full flex-1 justify-center pl-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          className="mt-12"
          inputClassName="px-0"
          control={control}
          name="code"
          label="Code überprüfen"
          placeholder="Code überprüfen"
        />
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
    </Layout>
  );
};
