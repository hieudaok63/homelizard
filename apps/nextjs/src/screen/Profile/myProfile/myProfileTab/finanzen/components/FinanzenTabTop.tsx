import Image from "next/image";

import { Cart } from "~/assets";

export default function FinanzenTabTop() {
  return (
    <div className="flex w-full justify-center">
      <div className="relative mr-10 h-[250px] w-[500px] rounded-3xl bg-blue_3 px-8 py-6">
        <h3 className="mb-1 text-3xl text-white">Brauchst du Hilfe?</h3>
        <p className="mb-4 h-20 text-base text-white">
          Hier verstecken sich oft Fragen deren Antwort man nicht kennt. Wende
          dich daher einfach unsere Spezialisten und Vermittler von finanzwerk
        </p>
        <div className="flex h-16 w-full items-center rounded-3xl bg-white p-2">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-blue_3">
            <Image src={Cart} alt="cart" />
          </div>
          <p className="ml-8 text-lg font-bold">Zum Spezialisten</p>
        </div>
        <div className="text absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white">
          +
        </div>
      </div>

      <div className="relative mr-10 h-[250px] w-[500px] rounded-3xl bg-pink px-8 py-6">
        <h3 className="mb-1 text-3xl text-white">Zusage vorhanden?</h3>
        <p className="mb-4 h-20 text-base text-white">
          Lade einfach hier digitale Nachweise um den Prozess zu beschleunigen
        </p>
        <div className="flex h-16 w-full items-center rounded-3xl bg-white p-2">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-pink"></div>
          <p className="ml-8 text-lg font-bold">Hier hochladen</p>
        </div>
        <div className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white">
          +
        </div>
      </div>
    </div>
  );
}
