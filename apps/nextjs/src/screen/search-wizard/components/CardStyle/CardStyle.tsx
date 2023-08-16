import { useCallback } from "react";
import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import { type RouterOutputs } from "~/utils/api";
import Check from "~/assets/icons/Check.svg";
import { useSearchWizardStore } from "~/zustand/store";

export type ObjectStyleItem = RouterOutputs["objectStyle"]["all"][number];

type IProps = {
  data: ObjectStyleItem;
  className?: string;
  selected?: boolean;
};

export const ObjectStyleCard = ({ data, className, selected }: IProps) => {
  const setObjectStyles = useSearchWizardStore(
    (slice) => slice?.setObjectStyles,
  );
  const objectStyles = useSearchWizardStore((slice) => slice?.objectStyles);

  const handleClick = useCallback(() => {
    if (objectStyles?.includes(data?.id)) {
      const newData = objectStyles?.filter((item) => item !== data?.id);
      setObjectStyles(newData);
      return;
    }

    const newData = [...objectStyles];
    newData.push(data?.id);
    setObjectStyles(newData);
  }, [objectStyles]);

  // main return
  return (
    <div
      className={cn(
        "relative h-[320px] w-full  cursor-pointer rounded-3xl transition-all duration-300 hover:scale-95",
        className,
      )}
      onClick={handleClick}
    >
      <div className="h-full w-full">
        <Image
          width={1000}
          height={500}
          src={data?.imageUrl}
          alt={data.id}
          className="h-full w-full rounded-3xl"
        />
      </div>
      <div className="min-h-14 xxl:w-[300px] absolute bottom-4 left-[50%] flex w-[150px] -translate-x-[50%] items-center justify-between overflow-hidden rounded-full bg-white px-4 py-3 xl:w-[250px]">
        <div className="w-[90%] overflow-hidden">
          <p
            className={cn(
              "w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold",
              selected ? "text-blue_3" : "text-black_xtra",
            )}
          >
            {data?.title}
          </p>
          <p className="line-clamp-1 flex-1 whitespace-pre-line text-xs text-grey_2">
            {data?.description}
          </p>
        </div>
        <div className="w-[10%]">
          {selected && <Image src={Check} alt="check" />}
        </div>
      </div>
    </div>
  );
};
