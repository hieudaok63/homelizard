import Image from "next/image";
import { useRouter } from "next/router";

import { Homelizard } from "~/assets";
import Message from "~/assets/icons/Message.svg";
import ButtonToggleHome from "./components/ButtonToggleHome";

export default function Topbar() {
  const router = useRouter();
  return (
    <div className="flex w-full items-center justify-between px-8 ">
      <div className="flex items-center">
        <Image
          src={Homelizard}
          alt="home"
          width={250}
          className="mr-10 cursor-pointer"
          onClick={() => router.push("/home")}
        />
        <ButtonToggleHome />
      </div>

      <div className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full">
        <Image src={Message} alt="Message" className="hover:scale-105" />
        <div className="">
          <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
            2
          </span>
        </div>
      </div>
    </div>
  );
}
