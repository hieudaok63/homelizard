import Image from "next/image";
import { type Range } from "react-input-range";

import Hous from "~/assets/icons/House.svg";
import LandIcon from "~/assets/icons/LandIcon.svg";
import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import { PATH_HOUSEAREA, PATH_LOCATION } from "~/constants/navigation";
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
export default function LandAreaScreen() {
  const plotSize = useSearchWizardStore((state) => state?.plotSize);
  const setPlotSize = useSearchWizardStore((state) => state?.setPlotSize);

  const handleChange = (newValue: Range | number) => {
    setPlotSize(newValue);
  };
  const plotArea = Number(plotSize) / 2;

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Grundstücksfläche"
        subContent="Wieviel qm Grundstücksfläche benötigst du?"
        path={PATH_LOCATION}
      />
      <div className="mb-20 mt-10">
        <CustomInputRange
          value={plotSize}
          maxValue={1000}
          minValue={0}
          step={5}
          onChange={(val: number | Range) => {
            handleChange(val);
          }}
          marks={customMarks}
        />
      </div>

      <div className="relative  flex w-full items-center justify-center ">
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
          <Image src={Hous} alt="land-icon" />
        </div>
        <span className="absolute right-[40%] top-[-20px] text-xs text-black_1">
          {plotSize} m²
        </span>
      </div>
      <div className=" flex w-full justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_HOUSEAREA} />
      </div>
    </LayoutSearch>
  );
}
