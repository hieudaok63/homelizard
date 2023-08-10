import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

import { api } from "~/utils/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Message from "~/assets/icons/Message.svg";
import Homelizard from "~/assets/icons/homelizard.svg";
import { PATH_HOME, PATH_PROFILE, PATH_SIGN_IN } from "~/constants/navigation";

const ButtonToggleHome = dynamic(
  () => import("~/components/layouts/components/ButtonToggleHome"),
  { ssr: false },
);

export default function Topbar() {
  const router = useRouter();
  const isRoute = router.asPath;
  const { signOut, isLoaded } = useAuth();
  // trpc
  const { data: profilePictureUrl } =
    api.profile.signedProfileImageUrl.useQuery();
  const { data: userInfo } = api.user.userInfo.useQuery();

  // functions
  const signOutFunc = async () => {
    if (!isLoaded) return;

    try {
      // setLoadingApp(true);
      await signOut();
      router.push(PATH_SIGN_IN);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoadingApp(false);
    }
  };

  // main return
  return (
    <div className="flex w-full items-center justify-between px-8 ">
      <div className="flex items-center">
        <Image
          src={Homelizard}
          alt="home"
          className="mr-10 w-[200px] cursor-pointer xl:w-[250px]"
          onClick={() => router.push(PATH_HOME)}
        />
        {isRoute === "/home" ? (
          <ButtonToggleHome leftContent="Dashboard" rightContent="Ergebnisse" />
        ) : (
          isRoute === "/profile" && (
            <ButtonToggleHome
              leftContent="Mein Profil"
              rightContent="Objekte"
            />
          )
        )}
      </div>

      <div className="flex items-center">
        <div className="relative mr-8 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full">
          <Image
            src={Message}
            alt="Message"
            className="scale-105 hover:scale-110"
          />
          <div className="">
            <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
              2
            </span>
          </div>
        </div>
        <div className="relative cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <Image
                src={profilePictureUrl?.url || ""}
                alt="avatar"
                width={50}
                height={50}
                className=" h-11 w-11 rounded-full"
              />
              <span className="absolute bottom-3 right-0 flex h-3 w-3 rotate-180 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                ^
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex items-center justify-start">
                <Image
                  src={profilePictureUrl?.url || ""}
                  alt="avatar"
                  width={50}
                  height={50}
                  className=" mr-5 h-10 w-10 select-none rounded-full"
                />
                <span className="font-bold">
                  {userInfo
                    ? `${userInfo?.firstName} ${userInfo?.lastName}`
                    : ""}
                </span>
              </div>
              <div className="my-3 h-[1px] w-full bg-slate-300"></div>
              <h3
                className="cursor-pointer rounded-lg p-2 text-sm font-semibold text-blue_1 hover:bg-slate-200"
                onClick={() => router.push(PATH_PROFILE)}
              >
                My Profile
              </h3>

              <p
                className="cursor-pointer rounded-lg p-2 text-center font-semibold hover:bg-slate-200"
                onClick={signOutFunc}
              >
                Log out
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
