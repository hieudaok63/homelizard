/* eslint-disable @typescript-eslint/no-unsafe-return */
import Image from "next/image";

import {
  number_room1,
  number_room2,
  number_room3,
  number_room4,
  number_room5,
  number_room6,
  number_room7,
  number_room8,
  number_room9,
  number_room10,
} from "~/assets";
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
  const livingM2 = Number(livingArea) / 3;

  const numberRooms = useSearchWizardStore((state) => state.numberOfRooms);
  const setNumberOfRoom = useSearchWizardStore(
    (state) => state.setNumberOfRooms,
  );

  const handleChange = (newValue: number) => {
    setNumberOfRoom(newValue);
  };

  const NumberRoom = () => {
    if (numberRooms === 1) {
      return number_room1;
    } else if (numberRooms === 2) {
      return number_room2;
    } else if (numberRooms === 3) {
      return number_room3;
    } else if (numberRooms === 4) {
      return number_room4;
    } else if (numberRooms === 5) {
      return number_room5;
    } else if (numberRooms === 6) {
      return number_room6;
    } else if (numberRooms === 7) {
      return number_room7;
    } else if (numberRooms === 8) {
      return number_room8;
    } else if (numberRooms === 9) {
      return number_room9;
    } else if (numberRooms === 0) {
      return number_room1;
    } else {
      return number_room10;
    }
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
            width: `${plotArea < 100 ? 100 : plotArea}px`,
          }}
        />
        <div className="absolute">
          <Image
            src={NumberRoom()}
            alt="land-icon"
            style={{
              width: `${
                livingM2 < 100 ? 100 : livingM2 > 400 ? 400 : livingM2
              }px`,
            }}
          />
        </div>
        <p className="absolute top-[-26px] text-sm text-grey">
          {numberRooms} Räume
        </p>
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
