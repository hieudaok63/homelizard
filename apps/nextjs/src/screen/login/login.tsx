import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import { z } from "zod";

import { showAppToast } from "~/utils/toast";
import {
  Facebook,
  Google,
  Linkedin,
  Twitter,
  passwordEye,
  passwordHide,
} from "~/assets";
import { Button, LayoutLoginRegister, TextInput } from "~/components";
import { PATH_OBJECTTYPE, PATH_PROFILE } from "~/constants/navigation";
import { useZodForm } from "~/hooks";
import { useApplicationLoadingStore } from "~/zustand/store";

const initialValues = {
  email: "",
  password: "",
};
const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginScreen = () => {
  const [showPasswordEye, setShowPasswordEye] = useState<boolean>(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const clerk = useClerk();
  useEffect(() => {
    if (isSignedIn) {
      router.push(PATH_PROFILE);
    }
  }, [isSignedIn, router]);

  const methods = useZodForm({
    mode: "onSubmit",
    schema: schema,
    defaultValues: initialValues,
  });
  const navigate = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

  const { control, handleSubmit } = methods;
  function parseJwt(token: string | null) {
    if (!token) return;

    const base64Url = token.split(".")[1];
    const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/") || "";
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  }

  const onSubmit = async (data: any) => {
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
        if (!clerk.session) return;
        const jwt = await clerk.session.getToken({ template: "jwt_metadata" });
        console.log(parseJwt(jwt));
        showAppToast(`Login successful`, "success");

        navigate.push(PATH_PROFILE);
      }
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
    <LayoutLoginRegister title="Login">
      <div className="p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-register flex-1 justify-center"
        >
          <TextInput
            className="mt-12"
            inputClassName="px-0"
            control={control}
            name="email"
            label="E-Mailadresse"
            placeholder="E-Mailadresse"
          />
          <div className="relative">
            <TextInput
              type={showPasswordEye ? "text" : "password"}
              className="mt-12"
              inputClassName="px-0"
              control={control}
              name="password"
              label="Password"
              placeholder="Password"
            />

            <div className=" absolute right-0 top-3 text-black">
              {showPasswordEye ? (
                <Image
                  src={passwordEye}
                  alt=""
                  className="w-4 cursor-pointer"
                  onClick={() => setShowPasswordEye(false)}
                />
              ) : (
                <Image
                  src={passwordHide}
                  alt=""
                  className="w-4 cursor-pointer"
                  onClick={() => setShowPasswordEye(true)}
                />
              )}
            </div>
          </div>
          <div className="mt-14 flex w-full justify-center">
            <Button className="w-[80%]" color="white" type="submit">
              Login
            </Button>
          </div>
          <p className="mt-4 flex w-full cursor-pointer justify-center text-sm text-grey">
            Or Sign Up Using
          </p>
        </form>
        <>
          <div className="flex w-full justify-center gap-3 py-4">
            <Image
              src={Facebook}
              className="h-7 w-7 cursor-pointer"
              alt="Facebook"
            />
            <Image
              src={Twitter}
              className="h-7 w-7 cursor-pointer"
              alt="Twitter"
            />
            <Image
              src={Google}
              className="h-7 w-7 cursor-pointer"
              alt="Google"
            />
            <Image
              src={Linkedin}
              className="h-7 w-7 cursor-pointer"
              alt="Linkedin"
            />
          </div>
          <div className="flex w-full justify-center text-grey">
            Have not account yet?
            <span
              className="ml-1 cursor-pointer text-blue_1"
              onClick={() => navigate.push(PATH_OBJECTTYPE)}
            >
              Sign up
            </span>
          </div>
        </>
      </div>
    </LayoutLoginRegister>
  );
};
