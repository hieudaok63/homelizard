import Image from "next/image";

import {
  ScreenFull,
  ScreenPadding,
} from "~/components/LayoutHommey/components";
import bannerBig from "~/assets/imageMarketting/bannerBig.png";
import { LayoutHommey } from "~/components";
import {
  Achievement,
  ArrowContent,
  ButtonHommey,
  ClientSayItem,
  ExpandableContent,
  FeaturedPropertySection,
  FederalStates,
  ImageBorder,
  RecentPropertyItem,
  ReviewEstate,
  TitleSeparate,
} from "~/hommeyComponents";

const array = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Hommey() {
  return (
    <LayoutHommey>
      <ScreenPadding>
        <div className="relative mb-6 w-full rounded-xl 2xl:h-[500px] 3xl:h-[620px]">
          <Image src={bannerBig} alt="" className="h-full w-full rounded-xl" />
          <div className="absolute left-[60px] 2xl:top-[100px] 3xl:top-[120px]">
            <div className=" flex flex-col text-[4.125rem] font-bold">
              <span>Wir finden</span>
              <span className="text-[#1252AE]">deine Traumimmobilie</span>
            </div>
            <p className="mb-4 mt-20 w-[40%]">
              Erklärtext Erklärtext Erklärtext Erklärtext Erklärtext Erklärtext
              Erklärtext Erklärtext Erklärtext Erklärtext Erklärtext Erklärtext
              Erklärtext Erklärtext
            </p>
            <ButtonHommey
              text="Jetzt Immobilie finden"
              big
              icon
              className="w-[430px]"
            />
          </div>
        </div>
      </ScreenPadding>
      <ScreenFull>
        <div className="py-[80px]">
          <TitleSeparate titleFirst="About" titleSecond="Us" />
        </div>
        <div className="flex gap-[110px]">
          <ImageBorder url="https://media.gettyimages.com/id/157315002/photo/snow-covered-house.jpg?s=612x612&w=gi&k=20&c=Z581v3Ovla_JumzZ7DlX_rooue85y9m5T-ARJ_HgawQ=" />
          <div className="w-1/2">
            <div className="mb-6 w-[90%] text-[2.5rem] font-bold">
              We Are The Best And Trusted
              <span className="text-[#1252AE]">Real Estate</span> Agent
            </div>
            <p className="mb-5 text-sm text-[#737D8C]">
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat.
            </p>
            <p className="mb-7 text-sm text-[#737D8C]">
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            <div className="h-[300px]">
              <ExpandableContent />
              <ExpandableContent />
              <ExpandableContent />
            </div>
          </div>
        </div>

        <div className="mt-[200px] flex gap-[110px] pb-[200px]">
          <div className="w-1/2">
            <div className="mb-6 w-[90%] text-[2.5rem] font-bold">
              We Are Offernig The Best Real Estate
              <span className="text-[#1252AE]"> Real Estate</span> Deals
            </div>
            <p className="mb-5 text-sm text-[#737D8C]">
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat.
            </p>
            <p className="mb-7 text-sm text-[#737D8C]">
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            <ArrowContent title="A building with only one room and typically a steep pointy roof." />
            <ArrowContent title="A vehicle on wheels that has a permanent residence attached to it." />
            <ArrowContent title="Performing financial analysis and valuation of properties." />
            <ArrowContent title="Someone who examines buildings and works with appraisers." />
            <ArrowContent title="A dwelling typically made of raw materials such as bamboo, mud, and clay." />

            <ButtonHommey text="View More" className="mt-[45px]" />
          </div>
          <ImageBorder url="https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg" />
        </div>
      </ScreenFull>

      {/* <ScreenPadding>
        <div className="py-[62px]">
          <TitleSeparate titleFirst="Recent" titleSecond="Property Deals" />
        </div>
        <div className="flex flex-wrap justify-between gap-y-6">
          {array.map((item) => (
            <RecentPropertyItem key={item} />
          ))}
          <div className="flex w-full justify-center">
            <ButtonHommey
              text="Verteilseite"
              icon
              className="mb-36 mt-14 h-[38px] w-[141px]"
            />
          </div>
        </div>
        <div className="pb-[62px]">
          <TitleSeparate titleFirst="Bundes" titleSecond="Länder" />
        </div>
        <div className="mb-32">
          <FederalStates />
        </div>
      </ScreenPadding> */}
      <ScreenFull>
        <div className="py-[80px]">
          <Achievement />
        </div>
      </ScreenFull>
      <ScreenPadding>
        <div className="py-[80px]">
          <div className="mb-[120px]">
            <TitleSeparate titleFirst="What Our" titleSecond=" Client Says" />
          </div>
          <div className="flex justify-between">
            <ClientSayItem />
            <ClientSayItem />
            <ClientSayItem />
          </div>
        </div>
      </ScreenPadding>
      <ScreenFull>
        <div className="py-[80px]">
          <div className="mb-[80px]">
            <TitleSeparate titleFirst="Featured " titleSecond=" Properties" />
          </div>
          <div className="flex justify-between ">
            <FeaturedPropertySection />
          </div>
        </div>
      </ScreenFull>
      <ScreenPadding>
        <div className="my-[80px]">
          <ReviewEstate />
        </div>
      </ScreenPadding>
    </LayoutHommey>
  );
}
