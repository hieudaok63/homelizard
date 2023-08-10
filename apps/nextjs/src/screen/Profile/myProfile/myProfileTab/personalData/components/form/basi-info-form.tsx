"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { cn } from "@homelizard/tailwind-config/utils";

import { api } from "~/utils/api";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Plus } from "~/assets";
import { Button } from "~/components";
import { useZodForm } from "~/hooks";
import { personalDataMocks } from "~/mocks";
import { CustomInputProfile, SelectProfile } from "~/screen";
import { type TPersonalDataItem } from "~/types";
import { useToggleStore } from "~/zustand/store";
import ProfileTab from "../ProfileTab";

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Other" },
];

const initialValues = {
  title: "",
  firstName: "",
  gender: "",
  middleName: "",
  lastName: "",
  suffix: "",
  birthDay: "",
};
const schema = z.object({
  gender: z.string().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  middleName: z.string().min(1).optional(),
  suffix: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  birthday: z.date().optional(),
});

type IPersonalDataForm = z.infer<typeof schema>;

export const BasisInfoForm = () => {
  const setToggleModal = useToggleStore((state) => state.setToggleModal);

  const { data, isLoading } = api.user.userInfo.useQuery();
  const personalDataMutation = api.user.update.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useZodForm({
    schema: schema,
    mode: "onSubmit",
    defaultValues: initialValues,
  });
  const onSubmit = async (formData: IPersonalDataForm) => {
    await personalDataMutation.mutateAsync(
      {
        title: formData?.title,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        middleName: formData?.middleName,
        gender: formData?.gender,
        suffix: formData?.suffix,
        birthday: formData?.birthday,
      },
      {
        onSuccess() {
          toast.success("Save successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        },
        onError(error) {
          console.log(error);
        },
      },
    );
  };

  useEffect(() => {
    if (data) {
      reset({
        title: data?.title || "",
        firstName: data?.firstName,
        lastName: data?.lastName,
        middleName: data?.middleName || "",
        gender: data?.gender,
        suffix: data?.suffix || "",
        birthday: data?.birthday,
      });
    }
  }, [data, reset]);

  return (
    <div className="h-full bg-white">
      <div className="w-full border-b-[1px] border-b-gray-400">
        <ProfileTab
          isIcon={false}
          data={personalDataMocks[0]?.subPersonData[0] as TPersonalDataItem}
        />
      </div>
      <form
        className="mt-2 flex h-full flex-col gap-5 p-4 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Add Title"
            name="title"
            label="Title"
            isIcon={true}
            icon={Plus}
          />
        </div>
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="First Name"
            name="firstName"
            label="First Name"
          />
        </div>
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Middle Name"
            name="middleName"
            label="Middle Name"
          />
        </div>
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Last Name"
            name="lastName"
            label="Last Name"
          />
        </div>
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Add"
            name="suffix"
            label="Suffix"
            isIcon={true}
            icon={Plus}
          />
        </div>
        <div className="flex w-full justify-start gap-8">
          <SelectProfile
            label="Gender"
            control={control}
            options={options}
            name="gender"
            isIcon={true}
            icon={Plus}
          />
        </div>
        <div className="flex gap-2">
          <label className="w-[30%] text-grey">Birthday</label>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { value, onChange } }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start rounded-none border-0 border-b-[1px] border-b-color_black px-0 text-left font-semibold",
                      !value && "text-muted-foreground",
                    )}
                  >
                    {value ? (
                      dayjs(value).format("DD|MM|YYYY")
                    ) : (
                      <span>Birthday</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(data) => {
                      onChange(data);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
        <div className="flex w-full justify-center">
          <Button onClick={() => setToggleModal(false)} className="mr-5">
            Back
          </Button>
          <Button type="submit" className="w-[100px]">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
