import { useRouter } from "next/router";
import { useClerk, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

import { api } from "~/utils/api";
import { showAppToast } from "~/utils/toast";
import {
  Button,
  LayoutLoginRegister,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextInput,
} from "~/components";
import { PATH_OBJECTTYPE } from "~/constants/navigation";
import { useZodForm } from "~/hooks";
import { registerNameGenderSchema } from "~/validations";
import {
  useApplicationLoadingStore,
  useSearchWizardStore,
  useUserStore,
} from "~/zustand/store";

const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
};

const genderOptions = {
  male: "male",
  female: "female",
  other: "other",
};

export const RegisterNameGender = () => {
  const searchWizardData = useSearchWizardStore((state) => state);
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);
  const resetSearchWizard = useSearchWizardStore((state) => state.reset);
  const setUserInfo = useUserStore((state) => state.setUser);
  const router = useRouter();
  // api
  const searchTrpc = api?.search?.searchProfile?.useMutation();
  const trpc = api.useContext();
  // clerk
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // functions
  const saveSearchProfile = async () => {
    await searchTrpc?.mutateAsync(
      {
        purchaseType: searchWizardData?.purchaseType,
        objectTypes: searchWizardData?.objectTypes,
        livingAreaSize: searchWizardData?.livingArea,
        roomAmount: searchWizardData?.numberOfRooms,
        latitude: searchWizardData?.location?.latitude ?? 20,
        longitude: searchWizardData?.location?.longitude ?? 100,
        radius: searchWizardData?.radius,
        plotSize: searchWizardData?.plotSize,
        availability:
          dayjs(searchWizardData?.availabilityDate)?.toDate() || new Date(),
        minPrice: 1,
        maxPrice: searchWizardData?.puchasePrice,
      },
      {
        onSuccess: () => {
          router.push("image-agb");
          showAppToast("Register successfully!", "success");
        },
        onError: async (err) => {
          console.log("err when saving search profile: ", err);
          await signOut();
          router.push(PATH_OBJECTTYPE);
          showAppToast(err?.message, "error");
        },
      },
    );
  };

  const register = api.user.register.useMutation({
    onSuccess: async () => {
      const user = await trpc.client.user.userInfo.query();
      setUserInfo(user);

      // save search profile
      saveSearchProfile();
      // clear local cache
      resetSearchWizard();
    },

    onError: async (err) => {
      await signOut();
      showAppToast(err?.message, "error");
    },
  });

  const { control, handleSubmit } = useZodForm({
    schema: registerNameGenderSchema,
    defaultValues: initialValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!isLoaded || !user) return;

    try {
      setLoadingApp(true);
      await register.mutateAsync(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoadingApp(false);
    }
  });

  // main return
  return (
    <LayoutLoginRegister title="Anrede und Name">
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
                      <SelectItem
                        className="cursor-pointer text-left text-base"
                        value={genderOptions?.male}
                      >
                        Male
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer text-left text-base"
                        value={genderOptions?.female}
                      >
                        Female
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer text-left text-base"
                        value={genderOptions?.other}
                      >
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
          <Button className="w-[80%]" color="white" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </LayoutLoginRegister>
  );
};
