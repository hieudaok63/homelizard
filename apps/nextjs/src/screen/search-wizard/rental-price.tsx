import Image from "next/image";

import Wing from "~/assets/icons/pngwing.svg";
import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import { PATH_CALENDAR, PATH_PURCHASEPRICE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const customMarks = [
  { value: 0, label: "0" },
  { value: 500, label: "500" },
  { value: 1000, label: "1000" },
  { value: 1500, label: "1500" },
  { value: 2000, label: "2000" },
  { value: 2500, label: "2500" },
  { value: 3000, label: "3000" },
  { value: 3500, label: "3500" },
  { value: 4000, label: "4000" },
  { value: 4500, label: "4500" },
  { value: 5000, label: "5000+" },
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
          maxValue={5000}
          step={100}
        />
      </div>

      <div className="mt-28 flex w-full items-end justify-center">
        {rentalPrice <= 1000 && (
          <Image src={Wing} alt="construction" width={60} />
        )}
        {rentalPrice <= 2000 && (
          <Image src={Wing} alt="construction" width={85} />
        )}
        {rentalPrice <= 3000 && (
          <Image src={Wing} alt="construction" width={110} />
        )}
        {rentalPrice <= 4000 && (
          <Image src={Wing} alt="construction" width={135} />
        )}
        <Image src={Wing} alt="construction" width={160} />
      </div>
      <div className="flex w-full justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_CALENDAR} />
      </div>
    </LayoutSearch>
  );
}
