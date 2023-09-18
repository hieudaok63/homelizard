import Image from "next/image";

import { homeReview } from "~/assets/iconsMarketting";

export default function ReviewEstate() {
  return (
    <div className="relative w-full rounded-3xl bg-blue_6/30 p-4 md:p-8 lg:p-10 xl:p-12">
      <div className="w-full lg:w-1/2">
        <h3 className="mb-4 text-3xl font-bold text-blue_6 drop-shadow-md lg:text-4xl">
          Immobilienbewertung
        </h3>
        <p className="mb-4 text-2xl font-bold lg:text-3xl">
          Sie wollen ihr Haus verkaufen?
        </p>
        <p className="mb-4 text-2xl font-bold lg:text-3xl">
          <span className=" text-blue_6">Jetzt</span> gratis bewerten lassen!
        </p>
        <div className="mt-4 flex items-center justify-between rounded-md bg-white p-3 shadow-md">
          <input
            type="text"
            className="h-full w-full rounded-md border-none text-lg outline-none"
            placeholder="Enter your email..."
          />

          <button className="rounded-sm bg-blue_6 px-3 py-1 text-base text-white hover:opacity-95">
            Bewertung
          </button>
        </div>
      </div>
      <Image
        src={homeReview}
        alt="house"
        className="absolute -bottom-3 right-0 hidden w-[25rem] lg:block"
        width={491}
        height={435}
      />
    </div>
  );
}
