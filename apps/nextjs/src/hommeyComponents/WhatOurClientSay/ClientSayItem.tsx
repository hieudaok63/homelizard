import Image from "next/image";

import { formatQuote, star } from "~/assets/iconsMarketting";

export default function ClientSayItem() {
  return (
    <div className="relative pb-10 pl-14 pr-6 pt-6 shadow-lg">
      <Image
        src="https://images.unsplash.com/photo-1611003228941-98852ba62227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        alt="avatar"
        className="mb-2 h-[4rem] w-[4rem] rounded-full object-cover"
        width={86}
        height={86}
      />
      <p className="border-b-[1px] pb-6 text-sm text-grey_4">
        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
        consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
        viverra quis.
      </p>
      <div className="mt-7 flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-base font-normal">Derrick P. Boudreaux</h3>
          <p className="text-sm font-normal">Web Developer</p>
        </div>
        <div className="flex">
          <Image src={star} alt="" />
          <Image src={star} alt="" />
          <Image src={star} alt="" />
          <Image src={star} alt="" />
          <Image src={star} alt="" />
        </div>
      </div>
      <div className="absolute right-0 top-8">
        <Image src={formatQuote} alt="" />
      </div>
    </div>
  );
}
