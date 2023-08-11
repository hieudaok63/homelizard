import { useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { MOBILE_PHONE_REGEX } from "@homelizard/api/src/constant/base.constant";

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
  phone: "",
};
const schema = z.object({
  phone: z.string().regex(MOBILE_PHONE_REGEX),
});
type IPhoneForm = z.infer<typeof schema>;

export const PhoneForm = () => {
  const { control, handleSubmit, reset } = useZodForm({
    schema: schema,
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const setToggleModal = useToggleStore((state) => state.setToggleModal);

  const { data, isLoading } = api.user.userInfo.useQuery();
  const phoneMutation = api.user.update.useMutation();

  const onSubmit = async (formData: IPhoneForm) => {
    await phoneMutation.mutateAsync(
      {
        mobilePhone: formData?.phone,
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
        phone: data?.mobilePhone || "",
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
          data={personalDataMocks[0]?.subPersonData[1] as TPersonalDataItem}
        />
      </div>
      <form
        className="mt-2 flex h-full flex-col gap-8 p-4 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Add a number"
            name="phone"
            label="Mobile"
            isIcon={true}
            icon={Plus}
          />
        </div>
        <div className="flex w-full justify-center">
          <Button onClick={() => setToggleModal(false)} className="mr-5">
            Back
          </Button>
          <Button type="submit" className="w-[100px]">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
