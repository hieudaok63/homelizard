import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { api } from "~/utils/api";
import { ArrowBack, ButtonSearchWizard, Loading } from "~/components";
import { PATH_CALENDAR, PATH_CHOOSE_IMAGE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";
import { ObjectStyleCard } from "./components";

export default function ListStyles() {
  const objectStyles = useSearchWizardStore((state) => state?.objectStyles);

  // api
  const { data, isLoading } = api.objectStyle.all.useQuery();

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
        path={PATH_CALENDAR}
      />

      <div className="mt-20 flex w-full justify-center">
        <div className="w-[90%] pb-4">
          <Swiper
            // @ts-ignore
            spaceBetween={30}
            slidesPerView={4.5}
            className="w-full"
          >
            {data?.map((val) => (
              <SwiperSlide className="w-full" key={val?.id}>
                <ObjectStyleCard
                  selected={objectStyles?.includes(val?.id)}
                  data={val}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="mt-36 flex w-full justify-center ">
        <ButtonSearchWizard
          title="Weiter"
          path={PATH_CHOOSE_IMAGE}
          disabled={objectStyles.length > 0 ? false : true}
        />
      </div>
    </LayoutSearch>
  );
}
