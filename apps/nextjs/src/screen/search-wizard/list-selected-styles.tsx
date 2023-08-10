import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { api } from "~/utils/api";
import { ArrowBack, ButtonSearchWizard, Loading } from "~/components";
import { PATH_REGISTER } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";
import { CardStyleSelected, type ObjectStyleItem } from "./components";

export default function ListSelectedStyles() {
  const objectStyles = useSearchWizardStore((state) => state?.objectStyles);
  console.log("objectStyles", objectStyles);

  // api
  const { data, isLoading } = api.objectStyle.all.useQuery();

  // functions
  const generateActualData = () => {
    const result: ObjectStyleItem[] = [];
    objectStyles?.forEach((item) => {
      const matchedValue = data?.find((val) => val?.id === item);
      if (matchedValue) result?.push(matchedValue);
    });
    return result;
  };

  if (isLoading)
    return (
      <LayoutSearch>
        <Loading />
      </LayoutSearch>
    );

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Welchen Stil soll das Objekt haben?"
        subContent="Wähle aus der Liste"
      />

      <div className="mt-20 flex w-full justify-center">
        <div className="w-full pb-4">
          <Swiper
            // @ts-ignore
            spaceBetween={30}
            slidesPerView={4.5}
            centerInsufficientSlides
          >
            {generateActualData()?.map((val, index) => (
              <div className="w-full" key={index}>
                <SwiperSlide className="w-full" key={val?.id}>
                  <CardStyleSelected data={val} />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="mt-14 flex w-full justify-center">
        <ButtonSearchWizard path={PATH_REGISTER} title="Continue" />
      </div>
    </LayoutSearch>
  );
}
