import { useEffect } from "react";
import Image from "next/image";
import Dropzone, { type Accept } from "react-dropzone";

import { api } from "~/utils/api";

type DropProps = {
  label: string;
  preview?: boolean;
  accept?: Accept;
  maxSize?: number;
  setUrl: (url: string) => void;
};

const acceptFile = {
  "image/png": [".png"],
  "image/svg": [".svg"],
  "image/jpg": [".jpg"],
  "image/gif": [".gif"],
  "image/jpeg": [".jpeg"],
} as Accept;

const acceptFilesVideo = [
  "mp4",
  "avi",
  "mov",
  "wmv",
  "flv",
  "mkv",
  "m4v",
  "webm",
  "mpg",
  "mpeg",
];
const acceptFilesImage = ["png", "svg", "jpg", "gif", "jpeg"];

export function DropUpload(props: DropProps) {
  const {
    label,
    preview = false,
    setUrl,
    maxSize,
    accept = acceptFile,
  } = props;

  //   const { mutate, data } = useMutationUploadImage();
  //   const { toastFail } = useCustomToast();
  //   const { mutate, data };
  const mutate: any = undefined;
  const data: any = undefined;
  const toastFail = (props: any) => {};
  const trpc = api.useContext();

  const sizeByteToMB = (b: number): number => Math.round(b / 1000000);

  const onDrop = async (files: File[]) => {
    if (!files[0]) return;
    console.log(files[0]);
    const type = files ? files[0]?.type?.split("/")[0] : "";
    const fileType = files && files[0]?.name?.split(".")?.slice(-1)[0];
    const checkTypeVideo =
      type === "video" && acceptFilesVideo.some((item) => fileType === item);
    const checkTypImage =
      type === "image" && acceptFilesImage.some((item) => fileType === item);
    if (!type) {
      toastFail({
        title: `The file is not in the correct image or video format`,
      });
      return;
    }
    if (type === "video" && !checkTypeVideo) {
      toastFail({
        title: `Video files must be in the following formats: ${acceptFilesVideo.join(
          ", ",
        )} `,
      });
      return;
    }
    if (type === "image" && !checkTypImage) {
      toastFail({
        title: `Image files must be in the following formats: ${acceptFilesImage.join(
          ", ",
        )} `,
      });
      return;
    }
    if (maxSize && sizeByteToMB(files[0].size) > sizeByteToMB(maxSize / 2)) {
      toastFail({
        title: `This file cannot exceed ${sizeByteToMB(maxSize / 2)}MB`,
      });
    } else {
      const fd = new FormData();
      fd.append("file", files[0]);
      console.log(
        "🚀 ~ file: drop-upload.tsx:94 ~ onDrop ~ files[0]:",
        files[0],
      );
      const { url } = await trpc.client.profile.signUploadUrl.query({
        fileSize: files[0].size,
      });
      console.log(url);
      await fetch(url, {
        method: "PUT",
        body: fd,
      });
      //   mutate(fd);
    }
  };

  useEffect(() => {
    if (data?.data?.url) {
      setUrl(data?.data?.url);
    }
  }, [data?.data?.url]);

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        accept={accept}
        maxSize={maxSize}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="container" style={{ width: "100%" }}>
            <div
              {...getRootProps({ className: "dropzone" })}
              // boxShadow="0 0 2px 4px #FFB0B0"
              className="border-1 cursor-pointer rounded-lg border border-dashed border-[#FFB0B0] p-4"
              //   border="1px dashed #FFB0B0"
              //   rounded="lg"
              //   p={4}
              //   cursor="pointer"
            >
              <input {...getInputProps()} />
              <div className="flex flex-col">
                <p className="text-placeholder">{label}</p>
                {maxSize && (
                  <p color="grey.400">Max {sizeByteToMB(maxSize / 2)} MB</p>
                )}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {preview && (
        <div className="w-full pt-4">
          {data?.data?.url && label === "Video" ? (
            <video
              src={data?.data?.url}
              controls
              style={{
                objectFit: "contain",
                width: "fit-content",
                height: "300px",
                margin: "0 auto",
              }}
            />
          ) : (
            <Image
              src={data?.data?.url}
              className="m-0-[auto]"
              alt="not"
              //   h={data?.data?.url ? "300px" : "100px"}
            />
          )}
        </div>
      )}
    </>
  );
}
