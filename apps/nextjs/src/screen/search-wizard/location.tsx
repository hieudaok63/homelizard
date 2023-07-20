import { useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { ArrowBack, ButtonSearchWizard, CustomInputRange } from "~/components";
import { PATH_LANDAREA, PATH_OBJECTTYPE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const customMarks = [
  { value: 0, label: "0", key: 0 },
  { value: 10, label: "10", key: 10 },
  { value: 20, label: "20", key: 20 },
  { value: 30, label: "30", key: 30 },
  { value: 40, label: "40", key: 40 },
  { value: 50, label: "50", key: 50 },
  { value: 60, label: "60", key: 60 },
  { value: 70, label: "70", key: 70 },
  { value: 80, label: "80", key: 80 },
  { value: 90, label: "90", key: 90 },
  { value: 100, label: "100", key: 100 },
];

export default function LocationScreen() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  // zustand
  const location = useSearchWizardStore((state) => state?.location);
  const radius = useSearchWizardStore((state) => state?.radius);

  const setLocation = useSearchWizardStore((state) => state?.setLocation);
  const setRadius = useSearchWizardStore((state) => state?.setRadius);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB3Wt83Wzsc23m5IdRtyegqaoVRe6roVRM",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Wo suchst du?"
        path={PATH_OBJECTTYPE}
      />

      <div className="relative xl:mx-32">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4  pl-10 text-sm text-gray-900 outline-0 focus:border-gray-400 "
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800  "
        >
          Search
        </button>
      </div>
      <div className="xl:mx-32">
        <h3 className="my-4 text-sm font-bold">Umkreis</h3>

        <CustomInputRange
          marks={customMarks}
          onChange={(val: number) => {
            setRadius(val);
          }}
          value={radius}
          minValue={0}
          maxValue={100}
          step={1}
        />
      </div>
      <div className="mt-10 flex justify-center rounded-full">
        <GoogleMap
          zoom={10}
          center={{ lat: 44, lng: -80 }}
          mapContainerStyle={{
            width: "300px",
            height: "300px",
            borderRadius: "999px",
          }}
        >
          <Marker position={{ lat: 44, lng: -80 }} />
        </GoogleMap>
      </div>
      <div className="flex w-full justify-center">
        <ButtonSearchWizard title="Continue" path={PATH_LANDAREA} />
      </div>
    </LayoutSearch>
  );
}
