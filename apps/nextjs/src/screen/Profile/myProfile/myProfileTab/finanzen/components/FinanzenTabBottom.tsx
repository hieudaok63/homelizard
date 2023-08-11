import Image from "next/image";

import { ArrowRight, ChevronUp } from "~/assets";

interface IProps {
  data: any;
  selected: boolean;
  onClick: () => void;
}
export default function FinanzenTabBottom(props: IProps) {
  const { data, selected, onClick } = props;
  return (
    <div
      className="relative mb-2 flex h-20 w-full cursor-pointer items-center justify-between rounded-xl bg-white px-4 hover:bg-slate-100"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-8 flex h-[60px] w-[60px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-gray-200">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-blue_3"></div>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold">{data.title}</h3>
          <p className="text-xs font-semibold text-grey">
            {data.content} {data.percent} <span className="text-blue_1">%</span>
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
