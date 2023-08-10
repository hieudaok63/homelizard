import Image from "next/image";

import { type RouterOutputs } from "@homelizard/api";

import { ArrowRight, ChevronUp, Heart } from "~/assets";

type FavoritesItem = RouterOutputs["favorite"]["list"]["data"][number];
interface IProps {
  data: FavoritesItem;
  selected: boolean;
  onClick: () => void;
}
export default function FavoriteItem(props: IProps) {
  const { data, selected, onClick } = props;

  return (
    <div
      className="relative mb-2 flex h-20 w-full cursor-pointer items-center justify-between rounded-xl bg-white px-4 hover:bg-slate-100"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-8 flex h-[60px] w-[60px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-gray-200">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-pink">
            <Image src={Heart} alt="Heart" />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold">
            {data.searchResult.realEstate.objectType}
          </h3>
          <p className="text-xs font-semibold text-grey">
            {data.searchResult.realEstate.description}
          </p>
        </div>
      </div>

      <div className="rounded-full p-2 hover:bg-gray-300 active:bg-gray-200">
        <Image
          src={selected ? ChevronUp : ArrowRight}
          alt=""
          className="h-6 w-6 cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
}
