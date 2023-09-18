import Image from "next/image";

import { arrowRight } from "~/assets/iconsMarketting";

interface IArrowContent {
  title: string;
}

export default function ArrowContent({ title }: IArrowContent) {
  return (
    <div className="flex items-start">
      <Image src={arrowRight} alt="" />
      <p className="ml-3 text-base">{title}</p>
    </div>
  );
}
