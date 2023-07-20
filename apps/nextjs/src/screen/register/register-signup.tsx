import { useFormContext } from "react-hook-form";

import { TextInput } from "~/components";

export const RegisterSignUp = () => {
  const methods = useFormContext();
  const { control, setValue, setError, handleSubmit } = methods;

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
      <TextInput
        type="password"
        className="mt-12"
        inputClassName="px-0"
        control={control}
        name="password"
        label="Passwort"
        placeholder="Passwort"
      />
      <TextInput
        type="password"
        className="mt-12"
        inputClassName="px-0"
        control={control}
        name="confirmPassword"
        label="Passwort wiederholen"
        placeholder="Passwort wiederholen"
      />
    </div>
  );
};
