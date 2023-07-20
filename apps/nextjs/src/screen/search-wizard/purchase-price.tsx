import Image from "next/image";

import Wing from "~/assets/icons/pngwing.svg";
import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import { PATH_CONSTRUCTION, PATH_RENTALPRICE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const customMarks = [
  { value: 0, label: "0" },
  { value: 100000, label: "100.000" },
  { value: 200000, label: "200.000" },
  { value: 300000, label: "300.000" },
  { value: 400000, label: "400.000" },
  { value: 500000, label: "500.000" },
  { value: 600000, label: "600.000" },
  { value: 700000, label: "700.000" },
  { value: 800000, label: "800.000" },
  { value: 900000, label: "900.000" },
  { value: 1000000, label: "1.000.000+" },
];

export default function PurchasePrice() {
  const purchasePrice = useSearchWizardStore((state) => state.puchasePrice);
  const setPurchasePrice = useSearchWizardStore(
    (state) => state.setPuchasePrice,
  );

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Kaufpreis"
        subContent="Welchen Kaufpreis soll deine Immobilie maximal haben?"
        path={PATH_CONSTRUCTION}
      />
      <div className="mb-20 mt-10 ">
        <CustomInputRange
          marks={customMarks}
          onChange={(val: number) => {
            setPurchasePrice(val);
          }}
          value={purchasePrice}
          minValue={0}
          maxValue={1000000}
          step={10000}
        />
      </div>

      <div className="mt-28 flex w-full items-end justify-center">
        {purchasePrice <= 200000 && (
          <Image src={Wing} alt="construction" width={60} />
        )}
        {purchasePrice <= 400000 && (
          <Image src={Wing} alt="construction" width={85} />
        )}
        {purchasePrice <= 600000 && (
          <Image src={Wing} alt="construction" width={110} />
        )}
        {purchasePrice <= 800000 && (
          <Image src={Wing} alt="construction" width={135} />
        )}
        <Image src={Wing} alt="construction" width={160} />
      </div>
      <div className="flex w-full justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_RENTALPRICE} />
      </div>
    </LayoutSearch>
  );
}
