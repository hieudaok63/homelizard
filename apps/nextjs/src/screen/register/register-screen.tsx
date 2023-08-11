import { useRouter } from "next/router";
import { useClerk, useSignUp } from "@clerk/nextjs";
import { FormProvider } from "react-hook-form";

import { showAppToast } from "~/utils/toast";
import { Button, LayoutLoginRegister, Loading } from "~/components";
import { PATH_SIGN_IN, PATH_VERIFYCODE } from "~/constants/navigation";
import { useZodForm } from "~/hooks";
import { registerSchema } from "~/validations";
import { useApplicationLoadingStore } from "~/zustand/store";
import { RegisterSignUp } from "./register-signup";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterScreen = () => {
  const router = useRouter();
  const methods = useZodForm({
    mode: "onSubmit",
    schema: registerSchema,
    defaultValues: initialValues,
  });
  const { isLoaded, signUp } = useSignUp();
  const { signOut } = useClerk();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
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
      showAppToast(`Please check email to get code`, "success");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push(PATH_VERIFYCODE);
    } catch (error: any) {
      showAppToast(
        `${error?.errors[0]?.message || "Some thing went wrong!"}`,
        "error",
      );
      await signOut();
    } finally {
      setLoadingApp(false);
    }
  };

  return (
    <>
      {isLoaded ? (
        <LayoutLoginRegister title="Sign up">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-register flex-1 justify-center p-8"
            >
              <RegisterSignUp />
              <div className="mt-14 flex w-full justify-center">
                <Button className="w-[80%]" color="white" type="submit">
                  Sign up
                </Button>
              </div>
            </form>
          </FormProvider>
          <div className="mt-4 flex w-full justify-center text-gray-400">
            Do you have an account ?
            <span
              className="ml-[2px] cursor-pointer text-blue_1"
              onClick={() => router.push(PATH_SIGN_IN)}
            >
              Login
            </span>
          </div>
        </LayoutLoginRegister>
      ) : (
        <Loading />
      )}
    </>
  );
};
