import { useState, type ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";
import { showAppToast } from "~/utils/toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button, Input } from "~/components";
import { useZodForm } from "~/hooks";
import { personalDataMocks } from "~/mocks";
import { useToggleStore } from "~/zustand/store";
import ProfileTab from "../ProfileTab";
import { FileItem } from "./curriculum-vitae-form/FileItem";

const schema = z.object({
  url: z.string().min(1),
  blobName: z.string().min(1),
});

type IUrlForm = z.infer<typeof schema>;

const initialValues: IUrlForm = {
  url: "",
  blobName: "",
};

export const CurriculumVitaeForm = () => {
  //trpc
  const trpc = api.useContext();
  const fileLinkMutation = api.profile.addCVByLink.useMutation();
  const { data, isLoading } = api.profile.listProfileCV.useQuery({});
  // local states
  const [file, setFile] = useState<File>();
  // zustand
  const setToggleModal = useToggleStore((state) => state.setToggleModal);
  // form
  const { control, handleSubmit, reset } = useZodForm({
    schema: schema,
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  // functions
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    setFile(file);
  };

  const handleClearFile = () => {
    setFile(undefined);
  };

  const handleUploadFile = async () => {
    if (!file) return;

    try {
      // get the s3 url for uploading file
      const resSignUploadFileUrl =
        await trpc.client.profile.signUploadFileUrl.query({
          fileSize: file.size,
          blobName: file.name,
          fileType: file.type,
        });

      await fetch(resSignUploadFileUrl?.url, {
        method: "PUT",
        body: file,
      });

      // save file to db
      await trpc.client.profile.signedFileUrl.query({
        blobName: file?.name,
        fileType: "curriculumVitae",
      });

      document.getElementById("closeDialog")?.click(); // close dialog
      handleClearFile();
      await trpc.profile.listProfileCV.invalidate();
    } catch (error) {
      console.log(error);
      showAppToast("Save CV failed!", "error");
    }
  };

  const onSubmitUrlForm = async (data: IUrlForm) => {
    await fileLinkMutation?.mutateAsync(
      { link: data?.url, blobName: data?.blobName },
      {
        onSuccess: async () => {
          showAppToast("Save CV successfully!", "success");
          reset();
          document.getElementById("closeDialog")?.click(); // close dialog
          await trpc.profile.listProfileCV.invalidate();
        },
        onError(error) {
          console.log("error saving CV link: ", error);
          showAppToast("Save CV failed!", "error");
        },
      },
    );
  };

  // main return
  return (
    <>
      <div className="w-full bg-white">
        <div className="w-full border-b-[1px] border-b-gray-400">
          <ProfileTab
            isIcon={false}
            percentClassName="w-[100px]"
            // @ts-ignore
            data={personalDataMocks[1]?.subPersonData[1]}
          />
        </div>
        <section className="mt-2 flex h-full flex-col gap-5 p-4 pb-8">
          {isLoading ? (
            <div className="w-full">
              <p className=" py-10 text-center text-lg text-black opacity-70">
                Loading...
              </p>
            </div>
          ) : data?.data?.length ? (
            <div className="w-full">
              {data?.data?.map((item) => (
                <FileItem key={item?.id} data={item} />
              ))}
            </div>
          ) : (
            <div className="w-full">
              <p className=" py-10 text-center text-lg text-black opacity-70">
                Nothing here yet...
              </p>
            </div>
          )}

          <div className="flex w-full justify-center">
            <Button onClick={() => setToggleModal(false)} className="mr-5">
              Back
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button className="mr-5">+ Add file</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload your CV via File or URL</DialogTitle>
                  <DialogDescription>
                    Choose on of the following options
                  </DialogDescription>
                </DialogHeader>

                <Accordion type="single" collapsible defaultValue="upload-file">
                  <AccordionItem
                    value="upload-file"
                    className=" cursor-pointer rounded-md px-2 py-3 duration-200"
                  >
                    <AccordionTrigger>Upload file</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex w-full flex-row items-center justify-between">
                        {!file ? (
                          <>
                            <p className="text-black">Upload your CV file</p>
                            <label className=" cursor-pointer rounded-md bg-black p-2 text-white opacity-90">
                              <input
                                className=" hidden"
                                type="file"
                                onChange={handleFileChange}
                                accept="application/pdf"
                              />
                              Choose file
                            </label>
                          </>
                        ) : (
                          <>
                            <div className=" flex flex-row items-center">
                              <p className=" text-brand">{file?.name}</p>
                              <span
                                onClick={handleClearFile}
                                className="ml-2 flex w-5 flex-row items-center justify-center rounded-full bg-red-500 text-white"
                              >
                                x
                              </span>
                            </div>

                            <Button onClick={handleUploadFile}>Upload</Button>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="add-link"
                    className=" cursor-pointer rounded-md border-b-0 px-2 py-3 duration-200"
                  >
                    <AccordionTrigger>Add link</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex w-full flex-row items-end justify-between">
                        <div className="w-full">
                          <Controller
                            control={control}
                            name="url"
                            render={({ field }) => (
                              <Input
                                placeholder="Enter your CV link URL"
                                {...field}
                              />
                            )}
                          />

                          <Controller
                            control={control}
                            name="blobName"
                            render={({ field }) => (
                              <Input
                                placeholder="Enter your CV name"
                                {...field}
                              />
                            )}
                          />
                        </div>

                        <Button
                          className="ml-8"
                          onClick={handleSubmit(onSubmitUrlForm)}
                        >
                          Save
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <DialogClose />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </>
  );
};
