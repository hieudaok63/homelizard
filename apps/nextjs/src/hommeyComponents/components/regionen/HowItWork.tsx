import Image from "next/image";

import { ArrowContent, ButtonHommey } from "~/hommeyComponents";

export default function HowItWork() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Image
        src="https://media.gettyimages.com/id/157315002/photo/snow-covered-house.jpg?s=612x612&w=gi&k=20&c=Z581v3Ovla_JumzZ7DlX_rooue85y9m5T-ARJ_HgawQ="
        alt=""
        width={536}
        height={585}
        className="xl:w-8/10 h-full w-full rounded-lg object-cover shadow-md lg:w-10/12"
      />
      <div className="mt-10 xl:mt-0">
        <p className="mb-8 text-center text-4xl font-bold lg:text-left">
          Wie funktioniert <span className="text-blue_6">Homelizard</span>?
        </p>
        <p className="mb-8 text-grey_4">
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero
          tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
          minus id quod maxime placeat. <br /> <br /> Sed ut perspiciatis unde
          omnis iste natus voluptatem accusantium doloremque laudantium, totam
          rem aperiam, eaque ipsa quae.
          <br />
        </p>
        <ArrowContent title="A building with only one room and typically a steep pointy roof." />
        <ArrowContent title="A building with only one room and typically a steep pointy roof." />
        <ArrowContent title="A building with only one room and typically a steep pointy roof." />
        <ArrowContent title="A building with only one room and typically a steep pointy roof." />
        <ArrowContent title="A building with only one room and typically a steep pointy roof." />
        <ButtonHommey
          text="Jetzt Immobilie in Memmingen finden"
          icon
          big
          className="mx-auto mt-12 lg:mx-0"
        />
      </div>
    </div>
  );
}
