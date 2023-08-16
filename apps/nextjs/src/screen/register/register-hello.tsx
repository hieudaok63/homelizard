import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { Button, LayoutLoginRegister } from "~/components";
import { PATH_PROFILE } from "~/constants/navigation";

export const RegisterHello = () => {
  const { data } = api.profile.signedProfileImageUrl.useQuery();
  const { data: userInfo } = api.user.userInfo.useQuery();

  const router = useRouter();

  return (
    <LayoutLoginRegister>
      <p className="p-4 text-center text-4xl font-semibold">
        Danke {userInfo?.firstName}!
      </p>
      <div className="my-2 flex items-center justify-center">
        <div className="flex h-[200px] w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-s-full rounded-t-full border-2 bg-slate-300">
          {data?.url && (
            <Image
              src={data?.url}
              width={500}
              height={500}
              alt=""
              className="h-full w-full"
            />
          )}
        </div>
      </div>
      <div className="mt-2 flex w-full items-center justify-center">
        <p className="w-[80%]">
          Wir haben die Basisinformation zu deinem Suchinteresse.Auf den
          nächsten Seiten unterstützen wir dich beim Kauf deiner
          Wunschimmobilie.
        </p>
      </div>
      <div className="mt-14 flex w-full justify-center">
        <Button
          className="w-[80%]"
          color="white"
          onClick={() => router.push(PATH_PROFILE)}
        >
          Continue
        </Button>
      </div>
    </LayoutLoginRegister>
  );
};
