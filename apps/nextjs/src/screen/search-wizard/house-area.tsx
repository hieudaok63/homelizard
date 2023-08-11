import { useEffect, useState } from "react";
import Image from "next/image";

import { number_room2 } from "~/assets";
import LandIcon from "~/assets/icons/LandIcon.svg";
import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import { PATH_LANDAREA, PATH_NUMBERROOMS } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const customMarks = [
  { value: 0, label: "0" },
  { value: 100, label: "100" },
  { value: 200, label: "200" },
  { value: 300, label: "300" },
  { value: 400, label: "400" },
  { value: 500, label: "500" },
  { value: 600, label: "600" },
  { value: 700, label: "700" },
  { value: 800, label: "800" },
  { value: 900, label: "900" },
  { value: 1000, label: "1000+" },
];

export default function HouseArea() {
  const [inputDisabled, setInputdisabled] = useState<boolean>(false);
  const plotSize = useSearchWizardStore((state) => state?.plotSize);
  const plotArea = Number(plotSize) / 2;

  const setlivingArea = useSearchWizardStore((state) => state?.setLivingArea);
  const livingArea = useSearchWizardStore((state) => state?.livingArea);
  const livingM2 = Number(livingArea) / 3;

  const handleChange = (newValue: number) => {
    setlivingArea(newValue);
  };

  useEffect(() => {
    if (livingM2 > plotArea) {
      setInputdisabled(true);
    } else setInputdisabled(false);
  }, [livingM2, plotArea]);

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Wohnfläche"
        subContent="Wieviel qm Grundstücksfläche benötigst du?"
        path={PATH_LANDAREA}
      />
      <div className="mb-20 mt-10 px-20">
        <CustomInputRange
          marks={customMarks}
          onChange={(val: number) => {
            handleChange(val);
          }}
          value={livingArea}
          step={5}
        />
      </div>

      <div className="relative flex  w-full items-center justify-center">
        <Image
          src={LandIcon}
          alt="land-icon"
          style={{
            width: `${plotArea < 100 ? 100 : plotArea}px`,
          }}
        />
        <div className="absolute">
          <Image
            src={number_room2}
            alt="hous-icon"
            style={{
              width: `${
                livingM2 < 100 ? 100 : livingM2 > 400 ? 400 : livingM2
              }px`,
            }}
          />
        </div>
        <span className="text-gray absolute top-[-20px] text-sm text-grey ">
          {livingArea} {livingArea === 1000 ? "+" : ""} m²
        </span>
      </div>
      <div className="flex w-full justify-center">
        <ButtonSearchWizard
          title="Continue"
          path={PATH_NUMBERROOMS}
          disabled={inputDisabled}
        />
      </div>
    </LayoutSearch>
  );
}
