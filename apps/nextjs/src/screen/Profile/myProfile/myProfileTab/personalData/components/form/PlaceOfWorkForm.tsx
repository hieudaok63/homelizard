"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { MOBILE_PHONE_REGEX } from "@homelizard/api/src/constant/base.constant";
import { cn } from "@homelizard/tailwind-config/utils";

import { api } from "~/utils/api";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Search } from "~/assets";
import { Button } from "~/components";
import { useZodForm } from "~/hooks";
import { personalDataMocks } from "~/mocks";
import { CustomInputProfile } from "~/screen/Profile/components";
import { type TPersonalDataItem } from "~/types";
import { useToggleStore } from "~/zustand/store";
import ProfileTab from "../ProfileTab";

const initialValues = {
  position: "",
  company: "",
  since: "",
  phone: "",
  email: "",
  website: "",
  address: {
    street: "HaNoi",
    city: "HaNoi",
    zipCode: "100000",
    country: "HaNoi",
  },
};

const schema = z.object({
  position: z.string(),
  company: z.string(),
  since: z.date(),
  phone: z.string().regex(MOBILE_PHONE_REGEX),
  email: z.string().email(),
  website: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
});
type IPlaceOfWorkForm = z.infer<typeof schema>;

export const PlaceOfWorkForm = () => {
  const setToggleModal = useToggleStore((state) => state.setToggleModal);

  const { data, isLoading } = api.user.userInfo.useQuery();
  const PlaceOfrWorkMutation = api.user.editPlaceOfWork.useMutation();

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

  const onSubmit = async (formData: IPlaceOfWorkForm) => {
    console.log(formData);
    await PlaceOfrWorkMutation.mutateAsync(
      {
        position: formData?.position,
        company: formData?.company,
        since: formData?.since,
        address: {
          street: "HaNoi",
          city: "HaNoi",
          zipCode: "100000",
          country: "HaNoi",
        },
        phone: formData?.phone,
        email: formData?.email,
        web: formData?.website,
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
        position: data?.placeOfWork?.position || "",
        company: data?.placeOfWork?.company,
        since: data?.placeOfWork?.since,
        address: data?.address || {},
        phone: data?.mobilePhone || "",
        email: data?.email,
        website: data?.website || "",
      });
    }
  }, [data, reset]);

  return (
    <div className="w-full bg-white">
      <div className="w-full border-b-[1px] border-b-gray-400">
        <ProfileTab
          isIcon={false}
          data={personalDataMocks[1]?.subPersonData[0] as TPersonalDataItem}
        />
      </div>
      <form
        className="mt-2 flex h-full flex-col gap-5 p-4 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Enter position"
            name="position"
            label="Position"
          />
        </div>

        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Enter name"
            name="company"
            label="Company"
          />
        </div>
        <div className="flex gap-2">
          <label className="w-[30%] text-grey">Since</label>
          <Controller
            control={control}
            name="since"
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
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Search loaction"
            name="address"
            label="Company address"
            isIcon={true}
            icon={Search}
          />
        </div>
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Enter company phone"
            name="phone"
            label="Phone"
          />
        </div>

        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Enter your work email"
            name="email"
            label="Email"
            isIcon={true}
          />
        </div>
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Company website"
            name="website"
            label="Web"
            isIcon={true}
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
