import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import { ArrowBack, ButtonSearchWizard } from "~/components";
import { PATH_IMAGE, PATH_RENTALPRICE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

export default function CalendarSearch() {
  const date = useSearchWizardStore((state) => state.availabilityDate);
  const setDate: any = useSearchWizardStore(
    (state) => state.setAvailabilityDate,
  );

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Verfügbarkeit"
        subContent="Wann sollte die Immobilie verfügbar sein?"
        path={PATH_RENTALPRICE}
      />
      <div className="mt-10 flex justify-center">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className=" flex justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_IMAGE} />
      </div>
    </LayoutSearch>
  );
}
