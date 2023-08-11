import Image from "next/image";
import dayjs from "dayjs";

import { type RouterOutputs } from "@homelizard/api";

import { api } from "~/utils/api";
import { showAppToast } from "~/utils/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { fileSvg, globeSvg } from "~/assets";
import { Button } from "~/components";

type TypeItemData = RouterOutputs["profile"]["listProfileCV"]["data"][number];

interface IProps {
  data: TypeItemData;
}

export const FileItem = ({ data }: IProps) => {
  // trpc
  const trpc = api.useContext();
  const fileLinkDeletion = api.profile.removeFile.useMutation();

  // functions
  const handleDelete = async () => {
    await fileLinkDeletion.mutateAsync(
      { fileId: data?.id },
      {
        onSuccess: async () => {
          showAppToast("Delete CV successfully!", "success");
          document.getElementById("closeDialog")?.click(); // close dialog
          await trpc.profile.listProfileCV.invalidate();
        },
        onError(error) {
          console.log("error deleting CV link: ", error);
          showAppToast("Delete CV failed!", "error");
        },
      },
    );
  };

  const handleOpenFileOrLink = async () => {
    try {
      if (data?.cvType === "link") {
        window.open(data?.url, "_blank"); // open the file in a new tab
        return;
      } // only used for file upload

      const fileLink = await trpc.client.profile.signedFileUrl.query({
        // @ts-ignore
        blobName: data?.blobName,
        fileType: "curriculumVitae",
      });

      const { url } = fileLink;

      if (!url) return;

      window.open(url, "_blank"); // open the file in a new tab
    } catch (error) {
      console.error(error);
      showAppToast("Something went wrong!", "error");
    }
  };

  // main return
  return (
    <div className="flex w-full flex-row items-center border-b-2 py-2">
      <div className=" flex flex-1 flex-row items-center">
        <div className="  mr-3 rounded-full rounded-br-none border-4 border-gray-200 bg-text_yellow p-2">
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={data?.blobName ? fileSvg : globeSvg}
            alt="file"
          />
        </div>
        <div>
          <p
            className="cursor-pointer overflow-hidden text-ellipsis text-lg text-black hover:text-blue-400 hover:underline"
            onClick={handleOpenFileOrLink}
          >
            {data?.blobName || data?.url}
          </p>
          <p className=" text-md text-black opacity-70">
            {dayjs(data?.updatedAt)?.format("DD MMMM YYYY")}
          </p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger>
          <Button className=" bg-red-500 text-white">Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this file (link)?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              file.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row items-center justify-end">
            <Button className=" bg-red-500 text-white" onClick={handleDelete}>
              Confirm
            </Button>
            <DialogClose />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
