import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

import { api } from "~/utils/api";
import { showAppToast } from "~/utils/toast";
import { warning } from "~/assets";
import { Button } from "~/components";
import { PATH_SIGN_IN } from "~/constants/navigation";
import { useToggleStore } from "~/zustand/store";

export default function ConfirmDelete() {
  const setToggleBtn = useToggleStore((state) => state.setToggleButton);
  const { data } = api.user.userInfo.useQuery();
  const { signOut } = useAuth();
  const router = useRouter();

  const deleteAccountMutation = api.user.deleteAccount.useMutation({
    async onSuccess() {
      await signOut();
      router.push(PATH_SIGN_IN);
      showAppToast(`Delete account success`, "success");
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleDeleteAccount = async () => {
    await deleteAccountMutation.mutateAsync();
  };

  return (
    <>
      <div className="flex w-[550px] flex-col items-center bg-white p-6 shadow-4xl">
        <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-red-200">
          <Image src={warning} alt="" />
        </div>

        <p className="p-2 text-2xl font-bold">Accountlöschung bestätigen</p>
        <span className="mb-20">
          Bitte bestätige, dass Du wirklich in vollem Bewusstsein diesen tollen
          Account löschen möchtest
        </span>

        <p className="mb-2 text-lg text-grey">E-Mailadresse</p>
        <div className="text-xl font-semibold text-red-600">{data?.email}</div>
        <div className="absolute bottom-8 flex rounded-3xl">
          <Button
            className="mr-5 w-[100px] rounded-3xl"
            onClick={() => setToggleBtn(false)}
          >
            Back
          </Button>

          <Button
            className="w-[200px] rounded-3xl"
            onClick={handleDeleteAccount}
          >
            Bestätigen
          </Button>
        </div>
      </div>
    </>
  );
}
