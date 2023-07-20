import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { api } from "~/utils/api";
import {
  Button,
  DropUpload,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  TextInput,
} from "~/components";
import { EGender } from "~/enums";
import { useZodForm } from "~/hooks";
import { IRegister } from "~/interfaces";
import { TOptions } from "~/types";
import { registerNameGenderSchema, registerSchema } from "~/validations";
import {
  useApplicationLoadingStore,
  useSearchWizardStore,
  useUserStore,
} from "~/zustand/store";
import { Layout } from "./_layout";

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

export const RegisterNameGender = () => {
  console.log("first");
  const register = api.user.register.useMutation({
    onSuccess: async () => {
      const user = await trpc.client.user.userInfo.query();
      setUserInfo(user);

      const body = {
        objectType: searchWizardData?.objectType || "Apartment",
        objectStyle: searchWizardData?.objectStyles?.[0] || "Bohemian",
        livingAreaSize: searchWizardData?.livingArea,
        roomAmount: searchWizardData?.numberOfRooms,
        latitude: searchWizardData?.location?.latitude ?? 20,
        longitude: searchWizardData?.location?.longitude ?? 100,
        radius: searchWizardData?.radius,
        plotSize: searchWizardData?.plotSize,
        startYearOfConstruction: searchWizardData?.yearOfConstructionStart,
        endYearOfConstruction: searchWizardData?.yearOfConstructionEnd,
        availability: new Date(searchWizardData?.availabilityDate),
        rentOrBuy: "rent",
        minPrice: 10,
        maxPrice: 100,
        address: {
          street: "f",
          city: "z.string()",
          zipCode: "z.string()",
          country: "z.string()",
        },
      };

      // save search profile
      await searchTrpc?.mutateAsync(body);

      resetSearchWizard();
    },
  });

  const searchTrpc = api?.search?.searchProfile?.useMutation();
  const searchWizardData = useSearchWizardStore((state) => state);
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);
  const resetSearchWizard = useSearchWizardStore((state) => state.reset);
  const setUserInfo = useUserStore((state) => state.setUser);
  const trpc = api.useContext();

  const { control, setValue, setError, handleSubmit } = useZodForm({
    schema: registerNameGenderSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
    },
  });

  const { user, isLoaded } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    if (!isLoaded || !user) return;

    try {
      setLoadingApp(true);
      await register.mutateAsync(data);
      console.log("success");
      // navigation?.navigate("RegisterAgb");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      console.log(err);
      // Toast.show({
      //   type: "error",
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      //   text1: err?.message || "Cannot save name and gender",
      // });
    } finally {
      setLoadingApp(false);
      // navigation?.navigate("RegisterAgb"); // hard code for now
    }
  });

  return (
    <Layout title="">
      <form
        className="form-register w-full flex-1 justify-center pl-8"
        onSubmit={onSubmit}
      >
        <TextInput
          className="mt-8"
          inputClassName="px-0"
          control={control}
          name="firstName"
          label="Vorname"
          placeholder="Vorname"
        />
        <TextInput
          className="mt-8"
          inputClassName="px-0"
          control={control}
          name="lastName"
          label="Nachname"
          placeholder="Nachname"
        />
        <div className="mt-12 w-full">
          <p className="label-gender mb-3 text-placeholder">Anrede</p>
          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange } }) => {
              return (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="h-10 w-full justify-start pl-2 text-left text-gray-500 placeholder:text-gray-600">
                    <SelectValue
                      className="text-left text-gray-500 placeholder:text-gray-600"
                      placeholder="Anrede"
                    />
                  </SelectTrigger>
                  <SelectGroup className="text-left">
                    <SelectContent className="border-1 border border-gray-700 text-left">
                      <SelectItem className="text-left" value={"male"}>
                        Male
                      </SelectItem>
                      <SelectItem className="text-left" value={"female"}>
                        Female
                      </SelectItem>
                      <SelectItem className="text-left" value={"other"}>
                        Others
                      </SelectItem>
                    </SelectContent>
                  </SelectGroup>
                </Select>
              );
            }}
          />
        </div>
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
