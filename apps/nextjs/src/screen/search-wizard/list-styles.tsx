import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";



import "swiper/css";
import { Button } from "~/components/ui/button";
import { ArrowBack } from "~/components";
import { PATH_CALENDAR, PATH_CHOOSE_IMAGE } from "~/constants/navigation";
import { searchWizardMock } from "~/mocks";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { type TSearchWizardStyle } from "~/types";
import { useSearchWizardStore } from "~/zustand/store";
import { ObjectStyleCard } from "./components";


export default function ListStyles() {
  const router = useRouter();

  const setObjectStyles_zustand = useSearchWizardStore(
    (state) => state?.setObjectStyles,
  );
  const objectStyles = useSearchWizardStore((state) => state?.objectStyles);
  const objectStylesRef = useRef(objectStyles);

  const [data, setData] = useState<TSearchWizardStyle[]>(() =>
    searchWizardMock?.map((val) => ({ ...val, is_check: false })),
  );
  useEffect(() => {
    const dataSelected =
      data?.map((val, index) => {
        if (val?.id === objectStylesRef.current[index]?.id)
          return { ...val, is_check: objectStylesRef.current[index]?.is_check };
        return val;
      }) || [];
    setData([...(dataSelected || [])]);
  }, []);
  useEffect(() => {
    const dataSelected = data?.filter((val) => val?.is_check);
    setObjectStyles_zustand([...dataSelected]);
  }, [data]);

  const handleClickChooseStyle = (value: any) => {
    setData((pre) =>
      pre?.map((val) => {
        if (val?.id === value?.id)
          return {
            ...value,
            is_check: !val?.is_check,
          };
        return val;
      }),
    );
  };

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Welchen Stil soll das Objekt haben?"
        subContent="Wähle aus der Liste"
        path={PATH_CALENDAR}
      />

      <div className="mt-10 flex w-full justify-center">
        <div className="w-[70%] pb-4">
          <Swiper
            spaceBetween={30}
            slidesPerView={3.5}
            className="w-full"
          >
            {data?.map((val, index) => (
              <SwiperSlide className="w-full" key={index}>
                <ObjectStyleCard
                  chooseStyle={() => handleClickChooseStyle(val)}
                  data={val}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className=" mt-20 flex w-full justify-center ">
        <Button
          className="h-12 w-60 rounded-3xl"
          onClick={() => router.push(PATH_CHOOSE_IMAGE)}
        >
          Weiter
        </Button>
      </div>
    </LayoutSearch>
  );
}