import { useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

import passwordEye from "~/assets/icons/eyePassword.svg";
import passwordHide from "~/assets/icons/passwordHide.svg";
import { TextInput } from "~/components";

export const RegisterSignUp = () => {
  const methods = useFormContext();
  const { control } = methods;
  const [showPasswordEye, setShowPasswordEye] = useState<boolean>(false);
  const [showConfirmPasswordEye, setShowConfirmPasswordEye] =
    useState<boolean>(false);

  return (
    <div className="w-full">
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

      <div className="relative">
        <TextInput
          type={showConfirmPasswordEye ? "text" : "password"}
          className="mt-12"
          inputClassName="px-0"
          control={control}
          name="confirmPassword"
          label="Passwort wiederholen"
          placeholder="Passwort wiederholen"
        />
        <div className=" absolute right-0 top-3 text-black">
          {showConfirmPasswordEye ? (
            <Image
              src={passwordEye}
              alt=""
              className="w-4 cursor-pointer"
              onClick={() => setShowConfirmPasswordEye(false)}
            />
          ) : (
            <Image
              src={passwordHide}
              alt=""
              className="w-4 cursor-pointer"
              onClick={() => setShowConfirmPasswordEye(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
