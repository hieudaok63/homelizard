import { useState } from "react";
import Image from "next/image";
import InputRange from "react-input-range";

import Construction from "~/assets/icons/Construction.svg";
import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import { PATH_NUMBERROOMS, PATH_PURCHASEPRICE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const customMarks = [
  { value: 1950, label: "<1950" },
  { value: 1957, label: "1957" },
  { value: 1965, label: "1965" },
  { value: 1972, label: "1972" },
  { value: 1979, label: "1979" },
  { value: 1987, label: "1987" },
  { value: 1994, label: "1994" },
  { value: 2001, label: "2001" },
  { value: 2008, label: "2008" },
  { value: 2016, label: "2016" },
  { value: 2023, label: "2023+" },
];

const minValueYOC = 1950;
const maxValueYOC = new Date()?.getFullYear();

export default function ConstructionYear() {
  // const [value, setValue] = useState<object>({ min: 0, max: 100 });
  const yearOfConstruction_zutand = useSearchWizardStore(
    (state) => state?.yearOfConstructionStart,
  );

  const setYearOfConstruction_zutand = useSearchWizardStore(
    (state) => state?.setYearOfConstructionStart,
  );

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Baujahr"
        subContent="Welches Baujahr soll deine Immobilie haben?"
        path={PATH_NUMBERROOMS}
      />
      <div className="mb-20 mt-10">
        <CustomInputRange
          marks={customMarks}
          onChange={(val: number) => {
            setYearOfConstruction_zutand(val);
          }}
          value={yearOfConstruction_zutand}
          minValue={minValueYOC}
          maxValue={maxValueYOC}
          step={1}
        />
      </div>
      <div className="mt-28 flex w-full justify-center">
        <Image src={Construction} alt="construction" width={380} />
      </div>

      <div className=" flex w-full justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_PURCHASEPRICE} />
      </div>
    </LayoutSearch>
  );
}
