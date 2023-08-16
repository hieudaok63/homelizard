import Image from "next/image";

import { type RouterOutputs } from "@homelizard/api";

import { api } from "~/utils/api";
import { genImageUrl } from "~/utils/helpers";
import { Message, Share, Utilities } from "~/assets";

type SearchResultItem = RouterOutputs["searchResult"]["list"]["data"][number];
interface IProps {
  data: SearchResultItem;
}

export default function ErgebnisseItem({ data }: IProps) {
  const { data: dataImg } = api.profile.signedProfileImageUrl.useQuery();

  return (
    <div className="mb-8 w-full rounded-3xl bg-white p-8 shadow-4xl transition-all duration-300 hover:scale-[102%]">
      <div className="mb-10 flex justify-between">
        <div className="flex">
          <div className="h-[60px] w-[60px] overflow-hidden rounded-s-full rounded-t-full ">
            {dataImg?.url && (
              <Image
                src={dataImg?.url}
                alt="avatar"
                width={500}
                height={500}
                className="h-full w-full cursor-pointer"
              />
            )}
          </div>
          <div className="mx-8">
            <h3 className="text-lg ">
              Ein <span className="font-bold">neues Ergebnis</span> wurde
              gefunden!
            </h3>
            <p className="font-semibold text-grey">vor 4 Stunden</p>
          </div>
        </div>
        <div>
          <Image
            src={Utilities}
            alt="Utilities"
            className="cursor-pointer hover:scale-105"
          />
        </div>
      </div>
      <div>
        <Image
          src={genImageUrl(data?.realEstate?.imageUrl)}
          alt={data?.realEstate.title}
          width={500}
          height={500}
          className="h-full w-full cursor-pointer rounded-xl"
        />
        <p className="my-3 ml-3 line-clamp-2 w-[500px] font-semibold text-grey">
          {data?.realEstate.title}
        </p>
      </div>
      <div className="flex border-t-2">
        <Image
          src={Message}
          alt="Message"
          className="mr-6 cursor-pointer hover:scale-105"
        />
        <Image
          src={Share}
          alt="Share"
          className="cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
}
