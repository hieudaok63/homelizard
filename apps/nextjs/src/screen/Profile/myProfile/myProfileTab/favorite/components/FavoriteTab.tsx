import Image from "next/image";
import { useRouter } from "next/router";

import { type RouterOutputs } from "@homelizard/api";

import { genImageUrl } from "~/utils/helpers";
import { Area, Bedroom, Shower } from "~/assets";
import { PATH_OBJECT_DETAIL } from "~/constants/navigation";

type FavoritesItem = RouterOutputs["favorite"]["list"]["data"][number];
export default function FavoriteTab({ data }: { data: FavoritesItem }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center">
        <div
          className="w-[80%] cursor-pointer"
          onClick={() =>
            router.push(`${PATH_OBJECT_DETAIL}/${data.searchResult.id}`)
          }
        >
          <Image
            src={genImageUrl(data.searchResult.realEstate.imageUrl)}
            alt={data.searchResult.realEstate.title}
            height={500}
            width={500}
            className="w-full"
          />
          <div className="mb-8 flex w-full flex-col items-start rounded-ee-3xl rounded-es-3xl bg-white p-4">
            <div className="my-8 flex">
              <div className="mr-16 flex items-center">
                <Image src={Bedroom} alt="" className="mr-3" />
                <span className="font-bold">
                  {data.searchResult.realEstate.numberOfBedroom}
                </span>
              </div>
              <div className="mr-16 flex items-center">
                <Image src={Shower} alt="" className="mr-3" />
                <span className="font-bold">
                  {data.searchResult.realEstate.numberOfBathroom}
                </span>
              </div>
              <div className="mr-16 flex items-center">
                <Image src={Area} alt="" className="mr-3" />
                <span className="font-bold">
                  {data.searchResult.realEstate.livingAreaSize}
                </span>
              </div>
            </div>
            <span className="text-xl font-bold">
              {data.searchResult.realEstate.price} €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
