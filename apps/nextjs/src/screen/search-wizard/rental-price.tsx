import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import {
  PuchasePrice1,
  PuchasePrice2,
  PuchasePrice3,
  PuchasePrice4,
} from "~/assets";
import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import { PATH_CALENDAR, PATH_PURCHASEPRICE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const customMarks = [
  { value: 0, label: "0" },
  { value: 400, label: "400" },
  { value: 800, label: "800" },
  { value: 1200, label: "1200" },
  { value: 1600, label: "1600" },
  { value: 2000, label: "2000" },
  { value: 2400, label: "2400" },
  { value: 2800, label: "2800" },
  { value: 3200, label: "3200" },
  { value: 3600, label: "3600" },
  { value: 4000, label: "4000+" },
];

export default function RentalPrice() {
  const rentalPrice = useSearchWizardStore((state) => state.rentalPrice);
  const setRentalPrice = useSearchWizardStore((state) => state.setRentalPrice);
  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Mietpreis (kalt)"
        subContent="Welchen Mietpreis soll deine Immobilie maximal haben?"
        path={PATH_PURCHASEPRICE}
      />
      <div className="mb-20 mt-10 ">
        <CustomInputRange
          marks={customMarks}
          onChange={(val: number) => {
            setRentalPrice(val);
          }}
          value={rentalPrice}
          minValue={0}
          maxValue={4000}
          step={100}
        />
      </div>

      <div className="mt-28 flex w-full items-end justify-center">
        <Image
          src={PuchasePrice1}
          alt="construction"
          className="mr-10 w-[100px]"
        />
        <Image
          src={PuchasePrice2}
          alt="construction"
          className={cn("mr-10 w-[150px]", rentalPrice <= 1000 && "blur-md")}
        />
        <Image
          src={PuchasePrice3}
          alt="construction"
          className={cn("mr-10 w-[150px]", rentalPrice <= 2000 && "blur-md")}
        />
        <Image
          src={PuchasePrice4}
          alt="construction"
          className={cn("mr-10 w-[150px]", rentalPrice <= 3000 && "blur-md")}
        />
      </div>
      <div className="flex w-full justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_CALENDAR} />
      </div>
    </LayoutSearch>
  );
}
