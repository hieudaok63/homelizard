import { z } from "zod";

import { Search } from "~/assets";
import { Button } from "~/components";
import { useZodForm } from "~/hooks";
import { personalDataMocks } from "~/mocks";
import { CustomInputProfile } from "~/screen/Profile/components";
import { type TPersonalDataItem } from "~/types";
import { useToggleStore } from "~/zustand/store";
import ProfileTab from "../ProfileTab";

const initialValues = {
  address: "",
};
const schema = z.object({
  address: z.string().optional(),
});
export const AddressForm = () => {
  const { control, handleSubmit } = useZodForm({
    schema: schema,
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const setToggleModal = useToggleStore((state) => state.setToggleModal);

  const onSubmit = (value: any) => {
    console.log(value);
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full border-b-[1px] border-b-gray-400">
        <ProfileTab
          className="mb-0"
          isIcon={false}
          percentClassName="w-[100px]"
          data={personalDataMocks[0]?.subPersonData[3] as TPersonalDataItem}
        />
      </div>
      <form
        className="mt-2 flex h-full flex-col gap-8 p-4 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full justify-start gap-8">
          <CustomInputProfile
            control={control}
            placeholder="Add address"
            name="address"
            label="Address"
            isIcon={true}
            icon={Search}
          />
        </div>
        <div className="flex w-full justify-center">
          <Button onClick={() => setToggleModal(false)} className="mr-5">
            Back
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
