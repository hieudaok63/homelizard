import Image from "next/image";
import { useRouter } from "next/router";

import ArrowLeft from "~/assets/icons/arrow-left.svg";

interface ArrowBackProps {
  text?: string;
  content?: string;
  subContent?: string;
  hide?: boolean;
  path?: string;
}

export default function ArrowBack({
  text,
  content,
  subContent,
  path,
  hide,
}: ArrowBackProps) {
  const router = useRouter();
  return (
    <div className="relative">
      <div className=" w-full justify-center">
        {!hide && (
          <div className="flex w-full flex-col items-center">
            <h3 className="mb-4 text-3xl font-extrabold text-black_xtra">
              {text}
            </h3>
            <h4 className="mb-2 text-lg font-extrabold text-black_xtra">
              {content}
            </h4>
            <span className="text-base font-light text-grey">{subContent}</span>
          </div>
        )}
      </div>
      <div
        onClick={async () => {
          if (path) {
            await router.push(path);
          } else {
            router.back();
          }
        }}
        className="w-[50px] cursor-pointer  "
      >
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          width={50}
          className="absolute top-0"
        />
      </div>
    </div>
  );
}
