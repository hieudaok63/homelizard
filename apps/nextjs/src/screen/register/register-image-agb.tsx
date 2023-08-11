import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { UploadProfilePictureModal } from "~/components/UploadProfilePicture";
import { Switch } from "~/components/ui/switch";
import Camera from "~/assets/icons/Camera.svg";
import { Button, LayoutLoginRegister } from "~/components";
import { useUploadProfilePictureStore } from "~/zustand/slices/uploadProfilePicture";

export const RegisterImageAgb = () => {
  const router = useRouter();
  const { setIsModalOpen } = useUploadProfilePictureStore((slice) => slice);

  const { data } = api.profile.signedProfileImageUrl.useQuery();

  return (
    <LayoutLoginRegister title="Picture & AGB">
      <p className="p-4 text-center text-4xl font-semibold">
        Your profile picture
      </p>
      <div className="my-2 flex items-center justify-center">
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex h-[200px] w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-s-full rounded-t-full border-2 bg-slate-300 hover:opacity-80"
        >
          {data?.url ? (
            <Image
              src={data?.url}
              width={500}
              height={500}
              alt=""
              className="h-full w-full"
            />
          ) : (
            <Image src={Camera} alt="" />
          )}
        </div>
        <UploadProfilePictureModal />
      </div>
      <div className="mt-10 flex w-full items-center justify-center">
        <Switch id="airplane-mode" className="mr-8" />
        <p className="w-[60%] text-grey">
          Hiermit stimme ich den Homelizard AGB uneingeschränkt zu.
        </p>
      </div>
      <div className="mt-14 flex w-full justify-center">
        <Button
          className="w-[80%]"
          color="white"
          type="submit"
          onClick={() => router.push("hello")}
        >
          Continue
        </Button>
      </div>
    </LayoutLoginRegister>
  );
};
