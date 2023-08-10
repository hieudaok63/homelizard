import dayjs from "dayjs";

import { type RouterOutputs } from "@homelizard/api";

type SearchItem = RouterOutputs["search"]["list"][number];
export default function SuchenTab({ data }: { data: SearchItem }) {
  return (
    <div className="mb-4 w-full bg-white p-8">
      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Objekttyp</span>
        <div className="w-full">
          <span className="text-lg font-semibold">{data.objectType}</span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Ort, Umkreis</span>
        <div className="w-full">
          <span className="text-lg font-semibold">
            {`${
              data.address?.city ? data.address?.city + "," : ""
            } ${data.radius.toString()}`.trim()}{" "}
            km
          </span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Grundstück</span>
        <div className="w-full">
          <span className="text-lg font-semibold">{data.plotSize} m²</span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Wohnfläche</span>
        <div className="w-full">
          <span className="text-lg font-semibold">
            {data.livingAreaSize} m²
          </span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Zimmer</span>
        <div className="w-full">
          <span className="text-lg font-semibold">{data.roomAmount}</span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Stil</span>
        <div className="w-full">
          <span className="text-lg font-semibold">
            {data?.objectStyles.join(", ")}
          </span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Baujahr</span>
        <div className="w-full">
          <span className="text-lg font-semibold">{`${data.startYearOfConstruction} - ${data.endYearOfConstruction}`}</span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-start">
        <span className="mr-16 w-32 text-sm text-grey_2">Verfügbarkeit</span>
        <div className="w-full">
          <span className="text-lg font-semibold">
            {dayjs(data.availability).format("DD.MM.YYYY")}
          </span>
          <div className="mt-3 h-[1px] w-full border-b-2 bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
