import { cn } from "@homelizard/tailwind-config/utils";

import {
  ButtonHommey,
  ExpandableContent,
  ImageBorder,
} from "~/hommeyComponents";
import { type Section } from "~/mocks/regionData";

type Item = {
  title: string;
  content: string;
};

interface Ileben extends Section {
  onClick?: () => void;
  reverse?: boolean;
}

export default function Leben({
  description,
  onClick,
  reverse,
  title,
  imageUrl,
  items,
}: Ileben) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-10 sm:gap-14 xl:flex-nowrap xl:justify-normal xl:gap-28",
        reverse && "flex-row-reverse",
      )}
    >
      <div className={cn("flex flex-col", reverse && "items-end")}>
        <ImageBorder url={imageUrl || ""} />
        <ButtonHommey
          text="Jetzt Immobilie finden"
          icon
          big
          className="mt-10"
          onClick={onClick}
        />
      </div>
      <div className="w-full xl:w-1/2">
        <p className="mb-6 w-[90%] text-2xl font-bold sm:text-3xl 3xl:text-[2.5rem]">
          {title}
        </p>
        <p className="mb-5 text-sm text-[#737D8C]">{description}</p>
        <div className="xl:h-[31.25rem]">
          {/* {items?.map((item) => (
            <ExpandableContent
              key={item.title}
              title={item.title}
              desc={item.content}
            />
          ))} */}
          <ExpandableContent data={items} />
        </div>
      </div>
    </div>
  );
}
