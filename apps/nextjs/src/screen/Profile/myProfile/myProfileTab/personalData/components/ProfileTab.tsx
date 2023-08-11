import { useState } from "react";
import Image from "next/image";

import { ChevronUp } from "~/assets";
import ArrowRight from "~/assets/icons/ArrowRight.svg";
import { type TPersonalDataItem } from "~/types";

interface IProfileTabProps {
  data: TPersonalDataItem & { is_active?: boolean };
  isIcon?: boolean;
  onArrow?: () => void;
}

export default function ProfileTab(props: IProfileTabProps) {
  const { data, onArrow } = props;
  const [active, setActive] = useState(data.is_active);

  return (
    <div
      className="relative mb-2 flex h-20 w-full cursor-pointer items-center justify-between rounded-xl bg-white px-4 hover:bg-slate-100"
      onClick={() => setActive(!active)}
    >
      <div
        onClick={onArrow}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center">
          <div className="mr-8 flex h-[60px] w-[60px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-gray-200">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-yellow-500"></div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold">{data.title}</h3>
            <p className="text-xs font-semibold text-grey">
              {data.content},
              <span className="text-blue_1">
                {data.show_percent && data.percent + "%"}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-full p-2 hover:bg-gray-300 active:bg-gray-200">
          <Image
            src={active ? ChevronUp : ArrowRight}
            alt=""
            className="h-6 w-6 cursor-pointer hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
