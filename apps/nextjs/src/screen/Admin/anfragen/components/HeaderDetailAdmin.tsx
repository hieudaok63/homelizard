import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { cn } from "@homelizard/tailwind-config/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { close, write } from "~/assets";

const dataEregnisse = [
  {
    id: 1,
    notiz:
      "Rückruf am Abend wie vereinbart. Sie hat weiterhin Interesse und will bis zum 21.07.2023 die Finanzierungsdokumente in der App hochladen. Sie schaut sich aber noch weitere Immobilien an, möchte eventuell noch ein Ferienhaus kaufen.",
    datum: "17.07.2023",
  },
  {
    id: 2,
    notiz:
      "Erster Kontakt per Anruf auf Mobiltelefon. Sie war kurz angebunden und bat um späteren Rückruf am Abend gegen 19 Uhr auf ihrer Festnetz Nummer.",
    datum: "17.07.2023",
  },
  {
    id: 3,
    notiz: "Anfrage über die App gestellt.",
    datum: "17.07.2023",
  },
];

export default function HeaderDetailAdmin() {
  const [toggle, setToggle] = useState(0);
  const router = useRouter();

  function handleToggle() {
    setToggle((prevState) => (prevState + 1) % 3);
  }
  return (
    <>
      <div
        className="flex h-[22px] w-[64px] cursor-pointer items-center justify-between rounded-2xl bg-gray-200 p-1"
        onClick={handleToggle}
      >
        <div
          className={cn(
            "h-[16px] w-[16px] rounded-full bg-[#03BD03] opacity-25",
            toggle === 0 && "opacity-100",
          )}
        ></div>
        <div
          className={cn(
            "h-[16px] w-[16px] rounded-full bg-yellow-500 opacity-25",
            toggle === 1 && "opacity-100",
          )}
        ></div>
        <div
          className={cn(
            "h-[16px] w-[16px] rounded-full bg-red-600 opacity-25",
            toggle === 2 && "opacity-100",
          )}
        ></div>
      </div>
      <Popover>
        <PopoverTrigger>
          <Image src={write} alt="" className="mx-3 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-screen rounded-2xl shadow-xl">
          <div>
            <p className="mb-4 text-lg font-bold">Ereignisse</p>
            <div className="flex items-center border-b-[2px] py-2 text-sm text-grey">
              <span className="w-[30%]">Datum</span>
              <span className="w-[60%]">Notiz</span>
            </div>

            {dataEregnisse.map((item, index) => (
              <div
                className="flex items-center border-b-[1px] py-2 font-normal"
                key={index}
              >
                <span className="w-[30%]">{item.datum}</span>
                <span className="w-[60%]">{item.notiz}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Image
        src={close}
        alt=""
        className="cursor-pointer"
        onClick={() => router.push("/admin/anfragen")}
      />
    </>
  );
}
