import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { api } from "~/utils/api";
import { Plus } from "~/assets";
import { Button } from "~/components";
import { useZodForm } from "~/hooks";
import { personalDataMocks } from "~/mocks";
import { CustomInputProfile } from "~/screen/Profile/components";
import { type TPersonalDataItem } from "~/types";
import { useToggleStore } from "~/zustand/store";
import ProfileTab from "../ProfileTab";

const initialValues = {
  email: "",
  website: "",
};
const schema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  website: z.string().trim().url({ message: "Invalid URL" }),
});

type IEmailWebsiteForm = z.infer<typeof schema>;

export const EmailWebForm = () => {
  const { data, isLoading } = api.user.userInfo.useQuery();
  const userInfoMutation = api.user.update.useMutation();

  const { control, handleSubmit, reset } = useZodForm({
    schema: schema,
    mode: "onSubmit",
    defaultValues: initialValues,
  });
  const setToggleModal = useToggleStore((state) => state.setToggleModal);

  const onSubmit = async (formData: IEmailWebsiteForm) => {
    await userInfoMutation.mutateAsync(
      {
        website: formData?.website,
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
        email: data?.email,
        website: data?.website || "",
      });
    }
  }, [data]);

  return (
    <div className="w-full bg-white">
      <div className="w-full border-b-[1px] border-b-gray-400">
        <ProfileTab
          className="mb-0"
          isIcon={false}
          percentClassName="w-[100px]"
          data={personalDataMocks[0]?.subPersonData[2] as TPersonalDataItem}
        />
      </div>
      <form
        className="mt-2 flex h-full flex-col gap-8 p-4 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Add email"
            name="email"
            label="Email"
            isIcon={true}
            icon={Plus}
          />
        </div>
        <div className="relative flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Add"
            name="website"
            label="Website"
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
