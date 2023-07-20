import Image from "next/image";

import Message from "~/assets/icons/Message.svg";
import Share from "~/assets/icons/Share.svg";
import Utilities from "~/assets/icons/Utilities.svg";

export default function ErgebnisseItem() {
  return (
    <div className="mb-8 rounded-3xl bg-white p-8">
      <div className="mb-10 flex justify-between">
        <div className=" h-[60px] w-[60px] overflow-hidden rounded-s-full rounded-t-full border-2 border-gray-500">
          <Image
            src="https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg"
            alt="avatar"
            width={100}
            height={100}
            className="h-full w-full cursor-pointer"
          />
        </div>
        <div className="mx-8">
          <h3 className="text-lg ">
            Ein <span className="font-bold">neues Ergebnis</span> wurde
            gefunden!
          </h3>
          <p className="font-semibold text-grey">vor 4 Stunden</p>
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
          src="https://api.makemyhouse.com/public/Media/rimage/500/completed-project/1592563415_856.jpg?watermark=false"
          alt="house"
          width={800}
          height={800}
          className="h-full w-full cursor-pointer rounded-xl"
        />
        <p className="my-3 ml-3 line-clamp-3 w-[500px] text-ellipsis indent-4 font-semibold text-grey">
          Ein neues Ergebnis wurde gefunden! Ein neues Ergebnis wurde
          gefunden!Ein neues Ergebnis wurde gefunden! gefunden!Ein neues
          Ergebnis wurde gefunden! Ergebnis wurde gefunden! Ergebnis wurde
          gefunden! Ergebnis wurde gefunden!
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
