// this modal can be opened by the "useUploadProfilePictureStore" in zustand (global state)

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { api } from "~/utils/api";
import { showAppToast } from "~/utils/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import uploadSvg from "~/assets/icons/upload.svg";
import { useUploadProfilePictureStore } from "~/zustand/slices/uploadProfilePicture";
import { Button } from "../ui";

export const UploadProfilePictureModal = () => {
  //trpc
  const trpc = api.useContext();
  // zustand
  const { isModalOpen, setIsModalOpen } = useUploadProfilePictureStore(
    (slice) => slice,
  );

  // local states
  const [file, setFile] = useState<File>();

  // functions
  const handleClearFile = () => {
    setFile(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleClearFile();
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileData = e?.target?.files?.[0];
    if (!fileData) return;
    setFile(fileData);
  };

  const handleSaveFile = async () => {
    if (!file) return;
    try {
      // get the s3 url for uploading file
      const { url } = await trpc.client.profile.signUploadUrl.query({
        fileSize: file.size,
      });
      // upload the file to s3 server
      await fetch(url, {
        method: "PUT",
        body: file,
      });
      await trpc.profile.signedProfileImageUrl.invalidate();
      handleCloseModal();
    } catch (error) {
      console.log(error);
      showAppToast("Save profile picture failed!", "error");
    }
  };

  // main return
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your profile picture</DialogTitle>
          <DialogDescription>
            Choose a picture from your gallery
          </DialogDescription>
        </DialogHeader>

        <div className="my-5 flex w-full flex-row items-center justify-center">
          {!file ? (
            <label className=" w-fit cursor-pointer overflow-hidden rounded-full rounded-br-none bg-grey_2 p-20 shadow-lg duration-200 hover:bg-grey">
              <Image alt="choose" src={uploadSvg} width={80} />
              <input
                className=" hidden"
                type="file"
                onChange={handleChangeFile}
              />
            </label>
          ) : (
            <div className="relative">
              <div className="max-h-96 overflow-y-auto">
                <Image
                  alt="file_chosen"
                  src={URL.createObjectURL(file)}
                  width={350}
                  height={350}
                />
                <X
                  className="absolute -right-4 -top-4 h-8 w-8 cursor-pointer rounded-full bg-red-500 p-2 text-white"
                  onClick={handleClearFile}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button className=" bg-red-500" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button onClick={handleSaveFile}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
