import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import Imagetest from "~/assets/images/BackgroundRegister.jpg";
import { HeaderDetailAdmin, InputInfo } from "./components";

export default function AnfragenDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = api.request.byId.useQuery({ searchRequestId: id as string });
  const result = data?.find((item) => item);
  console.log("result", result);

  return (
    <>
      <div className="flex items-center justify-end p-2">
        <HeaderDetailAdmin />
      </div>
      <div className="mb-6 flex gap-4">
        <div className="w-[50%] rounded-lg p-4 shadow-5xl">
          <p className="font-bold">#1257864 - Architektenhaus in Fellheim</p>
          <Image
            src={result?.realEstateObject?.imageUrl}
            alt=""
            className="my-2 h-[270px] w-[80%]"
            width={500}
            height={500}
          />
          <InputInfo title="Partner" content="intern" />
          <InputInfo title="Objekt-ID" content={result?.id} />
          <InputInfo title="Interessenten" content="3" icon />
          <InputInfo
            title="Preis"
            content={`${result?.realEstateObject.price} €`}
          />
          <InputInfo title="Anzahl Zimmer" content="3" />
          <InputInfo
            title="Anzahl Badezimmer"
            content={result?.realEstateObject?.numberOfBathroom}
          />
          <InputInfo
            title="Grundstücksfläche"
            content={`${result?.realEstateObject?.livingAreaSize} m²`}
          />
          <InputInfo
            title="Wohnfläche"
            content={`${result?.realEstateObject?.livingAreaSize} m²`}
          />
          <InputInfo title="Nutzfläche" content="80 m²" />
          <InputInfo
            title="Objekt Typ"
            content={result?.realEstateObject?.objectType}
          />
          <InputInfo
            title="Etagen"
            content={result?.realEstateObject?.numberOfFloor}
          />
          <InputInfo
            title="Beschreibung"
            content={result?.realEstateObject?.title}
            className="line-clamp-6 w-[300px] text-base"
          />
        </div>
        <div className="w-[50%] rounded-lg p-4 shadow-5xl">
          <div className="flex justify-start">
            <div className="w-[40%] py-3 pr-5">
              <Image src={Imagetest} alt="" />
            </div>
            <div className="flex-1">
              <InputInfo
                title="Name"
                content={`${result?.user?.firstName || ""} ${
                  result?.user?.middleName || ""
                } ${result?.user?.lastName || ""}`}
                infoUser
              />
              <InputInfo
                title="Geb. am"
                content={result?.user?.birthday || ""}
                infoUser
              />
              <InputInfo title="Tel." content="+49 23 12 456 789" infoUser />
              <InputInfo
                title="Mobile"
                content={result?.user?.mobilePhone || ""}
                infoUser
              />
              <InputInfo
                title="E-Mail"
                content={result?.user?.email || ""}
                infoUser
              />
              <div className="flex w-full items-center justify-start border-b-[1px] py-1">
                <p className="w-[143px] text-lg font-semibold tracking-wider text-gray-400">
                  Adresse
                </p>
                <div>
                  <p className="text-base">Wohnstrasse 77</p>
                  <p className="text-base">2. Stock</p>
                  <p className="text-base">77777 Wohnstadt</p>
                </div>
              </div>
              <InputInfo title="Profil" content="67%" infoUser />
            </div>
          </div>

          <h1 className="mt-2 text-lg font-bold tracking-wider">
            Persönliche Daten
          </h1>
          <InputInfo
            title="Anrede"
            content={result?.user?.gender}
            persionData
          />
          <InputInfo
            title="Vorname"
            content={result?.user?.firstName || ""}
            persionData
          />
          <InputInfo
            title="Nachname"
            content={result?.user?.lastName || ""}
            persionData
          />
          <InputInfo
            title="Geburtsdatum"
            content={result?.user?.birthday || ""}
            persionData
          />
          <InputInfo
            title="Geschlecht"
            content={result?.user?.gender || ""}
            persionData
          />
          <div className="flex w-full items-center justify-start border-b-[1px] py-1">
            <p className="w-[50%] text-lg font-semibold tracking-wider text-gray-400">
              Anschrift
            </p>
            <div>
              <p className="text-base">Wohnstrasse 77</p>
              <p className="text-base">2. Stock</p>
              <p className="text-base">77777 Wohnstadt</p>
            </div>
          </div>
          <InputInfo
            title="Telefon"
            content={result?.user?.mobilePhone || ""}
            persionData
          />
          <InputInfo
            title="Mobil"
            content={result?.user?.mobilePhone || ""}
            persionData
          />
          <InputInfo
            title="E-Mail"
            content={result?.user?.email || ""}
            persionData
          />
          <InputInfo
            title="Facebook"
            content="veronika.salzmann.77777"
            persionData
          />
          <InputInfo
            title="Skype"
            content="live.veronika.salzmann.test"
            persionData
          />
          <InputInfo title="Whatsapp" content="+491775557711" persionData />
          <InputInfo
            title="Messenger"
            content="veronika.salzmann.77777"
            persionData
          />
          <InputInfo title="Sternzeichen" content="Löwe" persionData />
          <h1 className="mt-4 text-lg font-bold tracking-wider">Beruf</h1>
          <InputInfo title="Position" content="HR Manager" persionData />
          <InputInfo title="Firma" content="Superfirma GmbH" persionData />
          <InputInfo
            title="Web"
            content={result?.user?.website || ""}
            persionData
          />
          <InputInfo title="Tägig seit" content="15.03.2001" persionData />
          <InputInfo title="Vertragsende" content="unbefristet" persionData />
        </div>
      </div>
    </>
  );
}
