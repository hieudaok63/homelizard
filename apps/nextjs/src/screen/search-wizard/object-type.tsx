import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Check, Haus, MHF } from "~/assets";
import {
  ArrowBack,
  ButtonSearchWizard,
  ButtonSwitchToggle,
} from "~/components";
import { PATH_LOCATION } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { objectTypeOptions } from "~/zustand/slices/searchWizard";
import { useSearchWizardStore } from "~/zustand/store";

const CheckObject = () => (
  <div className="absolute right-2 top-1 rounded-full bg-white">
    <Image src={Check} alt="check" />
  </div>
);

export default function ObjectTypeScreen() {
  const objectType = useSearchWizardStore((state) => state?.objectType);
  const setObjectType = useSearchWizardStore((state) => state?.setObjectType);

  const [option, setOption] = useState<boolean>(false);

  const menuRef: any = useRef();

  useEffect(() => {
    const handler = (e: { target: any }) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOption(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Objekttyp"
        subContent="Wähle die Art der gesuchten Immobilie"
      />
      <div className="mb-14 mt-6 flex w-full justify-center">
        <ButtonSwitchToggle />
      </div>

      <div className="flex w-full items-center justify-between xl:justify-around ">
        <div
          className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home hover:bg-slate-100 xl:w-32 ${
            objectType === "House with garden" && "shadow-lg shadow-slate-600"
          }`}
          onClick={() => setObjectType("House with garden")}
        >
          <Image src={Haus} alt="haus" />
          <span className="mt-3 text-xl font-bold">Haus</span>
          {objectType === "House with garden" && <CheckObject />}
        </div>
        <div
          className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home hover:bg-slate-100 xl:w-32 ${
            objectType === "Apartment" && "shadow-lg shadow-slate-600"
          }`}
          onClick={() => setObjectType("Apartment")}
        >
          <Image src={MHF} alt="haus" />
          <span className="mt-3 text-xl font-bold">MHF</span>
          {objectType === "Apartment" && <CheckObject />}
        </div>

        <div
          className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home p-4 text-center hover:bg-slate-100 xl:w-32 ${
            objectType !== "House with garden" &&
            objectType !== "Apartment" &&
            "shadow-lg shadow-slate-600"
          }`}
          onClick={() => setOption(!option)}
        >
          <span className="mt-3 select-none text-xl font-bold">
            {objectType &&
            objectType !== "House with garden" &&
            objectType !== "Apartment"
              ? objectType
              : "Mehr Optionen"}
          </span>

          {objectType !== "House with garden" && objectType !== "Apartment" && (
            <CheckObject />
          )}

          {option && (
            <div
              className="absolute top-[100%] rounded-t-3xl border-[1px] bg-white shadow-2xl"
              ref={menuRef}
            >
              <p className="cursor-default border-b-[1px] py-3 text-lg text-gray-400">
                Residence type
              </p>
              {objectTypeOptions?.map((item) => (
                <div
                  key={item}
                  onClick={() => setObjectType(item)}
                  className="w-[200px] select-none border-b-[1px] p-1 text-blue_1  hover:bg-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" flex w-full justify-center">
        <ButtonSearchWizard
          title="Continue"
          path={PATH_LOCATION}
          disabled={!objectType}
        />
      </div>
    </LayoutSearch>
  );
}
