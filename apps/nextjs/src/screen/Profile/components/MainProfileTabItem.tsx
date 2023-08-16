import Image from "next/image";
import { useRouter } from "next/router";

import { ArrowRight } from "~/assets";
import { type IMainProfileTabItem } from "~/mocks";

export default function MainProfileTabItem({
  ProfileArray,
}: {
  ProfileArray: IMainProfileTabItem;
}) {
  const router = useRouter();
  return (
    <div
      className="relative mb-5 flex h-20 w-full cursor-pointer items-center justify-between rounded-3xl bg-white px-4 hover:bg-slate-100"
      key={ProfileArray.id}
      onClick={() => router.push(ProfileArray?.path)}
    >
      <div className="flex items-center">
        <div className="mr-8 flex h-[60px] w-[60px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-gray-200">
          <div
            className={`flex h-[50px] w-[50px] items-center justify-center  rounded-s-full rounded-t-full border-2 ${ProfileArray.color}`}
          ></div>
        </div>
        <div>
          <h3 className="text-lg font-bold">{ProfileArray.content}</h3>
          <p className="text-xs font-semibold text-grey">
            {ProfileArray.description}
          </p>
        </div>
      </div>

      <Image
        src={ArrowRight}
        alt=""
        className="h-6 w-6 cursor-pointer hover:scale-105"
      />
      <div className="absolute bottom-0 left-28 h-2 w-[350px] rounded-se-lg rounded-ss-xl bg-slate-200">
        <div
          className={`h-full w-[${ProfileArray?.percent}%] rounded-ss-xl ${ProfileArray.color}`}
        ></div>
      </div>
    </div>
  );
}
