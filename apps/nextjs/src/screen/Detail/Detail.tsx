import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { cn } from "@homelizard/tailwind-config/utils";

import { api } from "~/utils/api";
import { genImageUrl } from "~/utils/helpers";
import Layout from "~/components/layouts";
import { Button } from "~/components/ui/button";
import { Area, Bedroom, Heart, Shower } from "~/assets";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = api.searchResult.byId.useQuery({
    searchResultId: id as string,
  });

  const [more, setMore] = useState(false);
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center bg-bg_home pb-6 pt-24">
        <div className="w-[800px]">
          <div className="relative overflow-hidden rounded-ee-[200px]">
            <Image
              src={genImageUrl(data?.realEstate.imageUrl)}
              alt="detail"
              width={600}
              height={600}
              className="h-[500px] w-full  object-cover"
            />
            <div className="absolute bottom-0 flex h-28 w-full items-center justify-center bg-green_1 opacity-90">
              <span className="text-4xl text-white">Immowerk</span>
            </div>
          </div>
          <h3 className="my-4 flex justify-end text-xl font-bold text-grey">
            {[
              data?.realEstate?.address?.street,
              data?.realEstate?.address?.city,
            ].join(", ")}
          </h3>
          <h2 className="mb-6 flex justify-center text-center text-4xl font-bold tracking-wide">
            {data?.realEstate.title}
          </h2>

          <div className="h-auto w-full rounded-3xl bg-white p-8 ">
            <span className="text-xl font-bold">
              {data?.realEstate.price} €
            </span>
            <div className="my-8 flex">
              <div className="mr-16 flex items-center">
                <Image src={Bedroom} alt="" className="mr-3" />
                <span className="font-bold">{data?.realEstate.roomAmount}</span>
              </div>
              <div className="mr-16 flex items-center">
                <Image src={Shower} alt="" className="mr-3" />
                <span className="font-bold">
                  {data?.realEstate.numberOfBathroom}
                </span>
              </div>
              <div className="mr-16 flex items-center">
                <Image src={Area} alt="" className="mr-3" />
                <span className="font-bold">
                  {data?.realEstate.livingAreaSize}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "relative h-[200px] overflow-hidden rounded-2xl border-y-[1px] border-l-4 border-purple border-y-slate-300 p-4 text-sm text-grey transition-all duration-700",
                more && "h-[500px]",
              )}
            >
              <h4 className="mb-3 text-base font-bold text-black">Daten</h4>
              <p>Typ</p>
              <p>{data?.realEstate.objectType}</p>
              <p>Etagenanzahl</p>
              <p>{data?.realEstate.numberOfFloor}</p>
              <p>Wohnfläche ca.</p>
              <p>{data?.realEstate.livingAreaSize} m²</p>
              <p>Grundstück ca.</p>
              <p>{data?.realEstate.plotSize} m²</p>
              <p>Zimmer</p>
              <p>{data?.realEstate.roomAmount}</p>
              <p>Schlafzimmer</p>
              <p>{data?.realEstate.numberOfBedroom}</p>
              <p>Badezimmer </p>
              <p>{data?.realEstate.numberOfBathroom}</p>
              <p
                className="absolute bottom-2 right-2 cursor-pointer font-semibold text-purple"
                onClick={() => setMore(!more)}
              >
                {!more ? "Merh..." : "weniger"}
              </p>
            </div>

            <div
              className={cn(
                "relative mt-6 h-[250px] overflow-hidden rounded-2xl border-y-[1px] border-l-4 border-purple border-y-slate-300 p-4 text-sm text-grey transition-all duration-700",
                !more && "h-[800px]",
              )}
            >
              <h4 className="mb-3 text-base font-bold text-black">
                Beschreibung
              </h4>
              <div>
                <p>{data?.realEstate.description}</p>
              </div>
              <p
                className="absolute bottom-2 right-2 cursor-pointer font-semibold text-purple"
                onClick={() => setMore(!more)}
              >
                {more ? "Merh..." : "weniger"}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-around">
              <div className="mr-5 flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl bg-black_xtra">
                <Image src={Heart} alt="" className="h-10 w-10" />
              </div>
              <div>
                <Button
                  children="Termin vereinbaren"
                  className="h-14 w-60 rounded-full text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
