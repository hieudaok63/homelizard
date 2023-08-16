import { useState } from "react";
import Image from "next/image";

import { ToggleFalse, ToggleTrue, warning } from "~/assets";
import { Button } from "~/components";
import { useToggleStore } from "~/zustand/store";

export default function ContactAccount() {
  const [toggle, setToggle] = useState(true);
  const setToggleBtn = useToggleStore((state) => state.setToggleButton);

  return (
    <>
      <div className="flex w-[550px] flex-col items-center bg-white p-6 shadow-4xl">
        <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-red-200">
          <Image src={warning} alt="" />
        </div>

        <p className="p-2 text-2xl font-bold">Account löschen</p>
        <span className="mb-20">
          Wenn Du Dein Account löschst, werden kleine Kätzchen sterben. Von der
          Löschung bleiben jedoch jene Daten unberührt, zu deren Speicherung wir
          verpflichtet oder berechtigt sind. Alle geschlossenen Verträge und
          getroffenen Vereinbarungen bleiben auch nach der Löschung wirksam.
        </span>

        <p className="mb-2 text-xl font-semibold">Kontakt</p>
        <div className="flex items-center justify-between">
          <span className="mr-4 ">
            Dürfen wir Dich bezüglich deiner Kontolöschung kontaktieren?
          </span>
          {toggle && (
            <Image
              src={ToggleTrue}
              alt=""
              className="w-16 cursor-pointer"
              onClick={() => setToggle(false)}
            />
          )}
          {!toggle && (
            <Image
              src={ToggleFalse}
              alt=""
              className="w-16 cursor-pointer"
              onClick={() => setToggle(true)}
            />
          )}
        </div>
        <Button
          className="absolute bottom-8 w-[200px] rounded-3xl"
          onClick={() => setToggleBtn(true)}
        >
          Continue
        </Button>
      </div>
    </>
  );
}
