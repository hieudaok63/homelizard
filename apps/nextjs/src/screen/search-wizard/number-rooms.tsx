import Image from "next/image";

import House from "~/assets/icons/House.svg";
import LandIcon from "~/assets/icons/LandIcon.svg";
import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const customMarks = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10+" },
];

export default function NumberRooms() {
  const plotSize = useSearchWizardStore((state) => state?.plotSize);
  const plotArea = Number(plotSize) / 2;

  const livingArea = useSearchWizardStore((state) => state?.livingArea);
  const livingM2 = Number(livingArea) / 2;

  const numberRooms = useSearchWizardStore((state) => state.numberOfRooms);
  const setNumberOfRoom = useSearchWizardStore(
    (state) => state.setNumberOfRooms,
  );

  const handleChange = (newValue: number) => {
    setNumberOfRoom(newValue);
  };

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Anzahl Räume"
        subContent="Wieviele Räume sollten es sein?"
        path="/search-wizard/HouseArea"
      />
      <div className="mt-10 px-20">
        <CustomInputRange
          onChange={(value: number) => {
            handleChange(value);
          }}
          step={1}
          value={numberRooms}
          marks={customMarks}
          minValue={0}
          maxValue={10}
        />
      </div>

      <div className="relative mt-20 flex w-full items-center justify-center">
        <Image
          src={LandIcon}
          alt="land-icon"
          style={{
            width: `${
              plotArea < 100 ? 100 : plotArea > 400 ? 400 : plotArea
            }px`,
          }}
        />
        <div className="absolute ">
          <Image
            src={House}
            alt="land-icon"
            style={{
              width: `${
                livingM2 < 100 ? 100 : livingM2 > 400 ? 400 : livingM2
              }px`,
            }}
          />
        </div>
        <span className="absolute text-xs text-[#26233299] ">
          {livingArea} m²
        </span>
        <span className="absolute right-[40%] top-[-20px] text-xs text-[#26233299]">
          {plotSize} m²
        </span>
      </div>
      <div className="flex w-full justify-center">
        <ButtonSearchWizard
          title="Continue"
          path="/search-wizard/Construction"
        />
      </div>
    </LayoutSearch>
  );
}
