import { useState } from "react";
import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import {
  Contruction_year1,
  Contruction_year2,
  Contruction_year3,
  Contruction_year4,
  Contruction_year5,
} from "~/assets";
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

export default function ConstructionYear() {
  const yearOfConstruction_start = useSearchWizardStore(
    (state) => state?.yearOfConstructionStart,
  );

  const setYearOfConstruction_start = useSearchWizardStore(
    (state) => state?.setYearOfConstructionStart,
  );
  const yearOfConstruction_end = useSearchWizardStore(
    (state) => state?.yearOfConstructionEnd,
  );
  const setYearOfConstruction_end = useSearchWizardStore(
    (state) => state?.setYearOfConstructionEnd,
  );
  const [value, setValue] = useState<object>({
    min: yearOfConstruction_start,
    max: yearOfConstruction_end,
  });

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
          onChange={(val: any) => {
            setValue(val);
            setYearOfConstruction_start(val.min);
            setYearOfConstruction_end(val.max);
          }}
          value={value}
          step={1}
          minValue={1950}
          maxValue={2023}
        />
      </div>
      <div className="mt-28 flex w-full items-end justify-center">
        <Image
          src={Contruction_year1}
          alt="construction"
          className={cn(
            "",
            yearOfConstruction_start >= 1980 && "blur-md",
            yearOfConstruction_end <= 1950 && "blur-md",
          )}
        />
        <Image
          src={Contruction_year2}
          alt="construction"
          className={cn(
            "",
            yearOfConstruction_start >= 1990 && "blur-md",
            yearOfConstruction_end <= 1980 && "blur-md",
          )}
        />
        <Image
          src={Contruction_year3}
          alt="construction"
          className={cn(
            "",
            yearOfConstruction_start >= 2000 && "blur-md",
            yearOfConstruction_end <= 1990 && "blur-md",
          )}
        />
        <Image
          src={Contruction_year4}
          alt="construction"
          className={cn(
            "",
            yearOfConstruction_start >= 2010 && "blur-md",
            yearOfConstruction_end <= 2000 && "blur-md",
          )}
        />
        <Image
          src={Contruction_year5}
          alt="construction"
          className={cn(
            "",
            yearOfConstruction_start >= 2023 && "blur-md",
            yearOfConstruction_end <= 2010 && "blur-md",
          )}
        />
      </div>

      <div className=" flex w-full justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_PURCHASEPRICE} />
      </div>
    </LayoutSearch>
  );
}
