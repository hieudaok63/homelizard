import { useState } from "react";
import Image from "next/image";

import Check from "~/assets/icons/Check.svg";
import Haus from "~/assets/icons/House.svg";
import Wohnung from "~/assets/icons/Wohnung.svg";
import {
  ArrowBack,
  ButtonSearchWizard,
  ButtonSwitchToggle,
} from "~/components";
import { PATH_LOCATION, PATH_REGISTER } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const moreOptions: string[] = [
  "Apartment",
  "Country house",
  "Dormitory on campus",
  "House with garden",
  "Mansion",
  "Shared apartment",
  "Town house",
  "Villa",
];
const CheckObject = () => (
  <div className="absolute right-2 top-1 rounded-full bg-white">
    <Image src={Check} alt="check" />
  </div>
);

export default function ObjectTypeScreen() {
  const setTypeSearch = useSearchWizardStore((state) => state?.setTypeSearch);
  const typeSearch = useSearchWizardStore((state) => state?.typeSearch);

  const [option, setOption] = useState<boolean>(false);

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Objekttyp"
        subContent="Wähle die Art der gesuchten Immobilie"
        path={PATH_REGISTER}
      />
      <div className="mb-14 mt-6 flex w-full justify-center">
        <ButtonSwitchToggle />
      </div>

      <div className="flex w-full items-center justify-between xl:justify-around ">
        <div
          className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home hover:scale-[102%] xl:w-32 ${
            typeSearch === "Haus" && "shadow-lg shadow-slate-600"
          }`}
          onClick={() => setTypeSearch("Haus")}
        >
          <Image src={Haus} alt="haus" />
          <span className="mt-3 text-xl font-bold">Haus</span>
          {typeSearch === "Haus" && <CheckObject />}
        </div>
        <div
          className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home hover:scale-[102%] xl:w-32 ${
            typeSearch === "Wohnung" && "shadow-lg shadow-slate-600"
          }`}
          onClick={() => setTypeSearch("Wohnung")}
        >
          <Image src={Wohnung} alt="haus" />
          <span className="mt-3 text-xl font-bold">Wohnung</span>
          {typeSearch === "Wohnung" && <CheckObject />}
        </div>

        <div
          className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home p-4 text-center hover:scale-[102%] xl:w-32 ${
            typeSearch !== "Haus" &&
            typeSearch !== "Wohnung" &&
            "shadow-lg shadow-slate-600"
          }`}
          onClick={() => setOption(!option)}
        >
          <span className="mt-3 text-xl font-bold">
            {typeSearch && typeSearch !== "Haus" && typeSearch !== "Wohnung"
              ? typeSearch
              : "Mehr Optionen"}
          </span>

          {typeSearch !== "Wohnung" && typeSearch !== "Haus" && <CheckObject />}

          <div className="absolute bottom-[-220px]">
            <ul className="rounded-lg">
              {moreOptions?.map(
                (item) =>
                  option && (
                    <li
                      key={item}
                      onClick={() => setTypeSearch(item)}
                      className="w-52 border-[1px] hover:bg-bg_home"
                    >
                      {item}
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className=" flex w-full justify-center">
        <ButtonSearchWizard
          title="Continue"
          path={PATH_LOCATION}
          disabled={!typeSearch}
        />
      </div>
    </LayoutSearch>
  );
}
