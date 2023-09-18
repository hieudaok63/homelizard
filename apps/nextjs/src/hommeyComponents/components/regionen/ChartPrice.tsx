import Image from "next/image";

import { euro } from "~/assets";
import LineChart from "~/assets/imageMarketting/LineChart.png";

const ArrTest = [1, 2, 3];

export default function ChartPrice() {
  return (
    <div>
      <p className="py-5 text-2xl font-bold sm:py-7 sm:text-3xl xl:py-10 xl:text-[2.5rem]">
        Immobilienpreise und Entwicklung
      </p>

      <div className="mb-14 flex flex-wrap-reverse gap-4 sm:flex-nowrap sm:gap-4 xl:gap-40">
        <div className=" w-full sm:w-[40%] xl:w-[30%]">
          {ArrTest?.map((item) => (
            <div
              key={item}
              className="mb-3 flex h-24 w-full items-center rounded-sm border-[1px] pl-6 xl:h-28"
            >
              <Image src={euro} alt="" />
              <div className="ml-5">
                <p>Wohnungen zur Miete</p>
                <span className="text-xl text-[#737D8C]">18,00 </span>
                <span className=" text-[#737D8C]">€/m²</span>
              </div>
            </div>
          ))}
        </div>
        <Image src={LineChart} alt="" className="sm:w-[60%] xl:w-[70%]" />
      </div>
    </div>
  );
}
