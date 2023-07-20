import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Button } from "~/components/ui/button";
import { ArrowBack } from "~/components";
import {
  PATH_CHOOSE_IMAGE,
  PATH_IMAGE,
  PATH_REGISTER,
} from "~/constants/navigation";
import { searchWizardMock } from "~/mocks";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { type TSearchWizardStyle } from "~/types";
import { useSearchWizardStore } from "~/zustand/store";
import { CardStyle, CardStyleSelected } from "./components";
import { listStyle } from "./css";

export default function ListSelectedStyles() {
  const router = useRouter();

  const objectStyles: TSearchWizardStyle[] = useSearchWizardStore(
    (state) => state?.objectStyles,
  );

  const [data, setData] = useState<TSearchWizardStyle[]>(() =>
    searchWizardMock?.map((val) => ({ ...val, is_check: false })),
  );
  useEffect(() => {
    const dataSelected = objectStyles?.filter((val) => val?.is_check) || [];
    setData([...dataSelected]);
  }, []);

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Welchen Stil soll das Objekt haben?"
        subContent="Wähle aus der Liste"
        path={PATH_IMAGE}
      />

      <div className="flex w-full flex-col items-center pb-8">
        <div
          className={`mt-10 flex max-h-[500px] w-[70%] overflow-y-auto bg-white ${listStyle.scroll}`}
        >
          <div className="flex w-full flex-col gap-4 bg-white">
            {data?.map((val, index) => (
              <div className="w-full" key={index}>
                <CardStyleSelected
                  className="h-[100px]"
                  // chooseStyle={() => handleClickChooseStyle(val)}
                  data={val}
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" mt-10 flex w-full justify-center">
          <Button
            className="h-12 w-36 rounded-3xl bg-pink hover:bg-pink_3"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            className="ml-4 h-12 w-36 rounded-3xl"
            onClick={() => router.push(`/${PATH_REGISTER}`)}
          >
            Continue
          </Button>
        </div>
      </div>
    </LayoutSearch>
  );
}
