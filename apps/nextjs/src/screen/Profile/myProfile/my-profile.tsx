import { useState } from "react";
import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import { api } from "~/utils/api";
import { UploadProfilePictureModal } from "~/components/UploadProfilePicture";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { EditProfile, Ellipsis, uploadSvg } from "~/assets";
import { ProfileArrays, type IMainProfileTabItem } from "~/mocks";
import { useUploadProfilePictureStore } from "~/zustand/slices/uploadProfilePicture";
import { MainProfileTabItem } from "../components";

export default function MyProfile() {
  // trpc
  const { data: profilePictureUrl } =
    api.profile.signedProfileImageUrl.useQuery();
  const { data: userInfo } = api.user.userInfo.useQuery();
  // zustand
  const setModalUploadProfilePictureOpen = useUploadProfilePictureStore(
    (slice) => slice.setIsModalOpen,
  );
  // local states
  const [fullImage, setFullImage] = useState(false);

  // main return
  return (
    <div
      className={cn(
        "relative mt-24 flex justify-center px-4",
        fullImage && "mt-0 bg-black",
      )}
    >
      {fullImage && (
        <span
          className="absolute right-5 top-24 rotate-45 cursor-pointer text-5xl font-semibold text-white "
          onClick={() => setFullImage(false)}
        >
          +
        </span>
      )}

      <div className="h-auto w-[700px] bg-white">
        <div
          className={cn(
            "relative w-full",
            fullImage ? "h-screen overflow-hidden" : "h-[500px]",
          )}
        >
          {profilePictureUrl?.url ? (
            <Image
              src={profilePictureUrl?.url}
              alt="avt"
              width={500}
              height={500}
              className={cn(
                "h-full w-full cursor-pointer rounded-ee-[200px] object-cover transition-all duration-200",
                fullImage && "rounded-none object-cover",
              )}
              onClick={() => setFullImage(true)}
            />
          ) : (
            <div className=" h-full w-full bg-grey_2"></div>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <div className=" absolute bottom-0 right-3 cursor-pointer rounded-full p-2 duration-200 hover:bg-grey_2">
                <Image src={Ellipsis} alt="ellipsis" className="" width={30} />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div
                onClick={() => setModalUploadProfilePictureOpen(true)}
                className="flex w-full cursor-pointer flex-row items-center rounded-md p-2 duration-200 hover:bg-grey_2"
              >
                <Image alt="upload" src={uploadSvg} className="mr-3" />
                <p className="text-base text-black opacity-70">
                  {profilePictureUrl?.url ? "Edit" : "Upload"} profile picture
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {!fullImage && (
          <>
            <div className="px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="my-6 text-4xl font-medium">
                    {userInfo
                      ? `Hello , ${userInfo?.firstName} ${userInfo?.lastName}`
                      : ""}
                  </p>
                  <div className="flex items-start">
                    <span className="mr-3 line-clamp-2 text-sm text-grey">
                      Teile uns etwas über dich mit Teile uns etwas über dich
                      Teile uns etwas über dich mit Teile uns etwas über dich
                      mit...
                    </span>

                    <Image
                      src={EditProfile}
                      alt=""
                      className="h-6 w-6 cursor-pointer hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" h-[500px] rounded-se-[100px] bg-yellow-200 px-6">
              <div className="mt-10  pb-10 pt-3 text-3xl">Mein Profil</div>
              {ProfileArrays.map((ProfileArray: IMainProfileTabItem) => (
                <div key={ProfileArray.id}>
                  <MainProfileTabItem ProfileArray={ProfileArray} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <UploadProfilePictureModal />
    </div>
  );
}
