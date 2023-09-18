import {
  ScreenFull,
  ScreenPadding,
} from "~/components/LayoutHommey/components";
import { LayoutHommey } from "~/components";
import {
  Achievement,
  ArrowContent,
  ButtonHommey,
  ExpandableContent,
  FeaturedPropertySection,
  FederalStates,
  HeroBanner,
  ImageBorder,
  ReviewEstate,
  TitleSeparate,
} from "~/hommeyComponents";
import { RecentPropertySection } from "~/hommeyComponents/RecentProperty";
import ClientSaySection from "~/hommeyComponents/WhatOurClientSay/ClientSaySection";
import { type ItemInSection } from "~/mocks/regionData";

const offerDummyData = [
  "A building with only one room and typically a steep pointy roof.",
  "A vehicle on wheels that has a permanent residence attached to it.",
  "Performing financial analysis and valuation of properties.",
  "Someone who examines buildings and works with appraisers.",
  "A dwelling typically made of raw materials such as bamboo, mud, and clay.",
];

const realEstateAgentDummyData: ItemInSection[] = [
  {
    title: "Sed ut perspiciatis unde omnis ?",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores ratione voluptatem sequi nesciunt.",
  },
  {
    title: "Quis autem vel eum iure reprehenderit ?",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores ratione voluptatem sequi nesciunt.",
  },
  {
    title: "SSed ut perspiciatis unde omnis..?",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores ratione voluptatem sequi nesciunt.",
  },
];

export default function Hommey() {
  return (
    <LayoutHommey>
      <ScreenPadding>
        <HeroBanner
          title="Wir finden deine Traumimmobilie"
          descriptions={["Was man über homelizard wissen muss."]}
          ActionButton={
            <ButtonHommey
              text="Jetzt Immobilie finden"
              big
              icon
              className="mt-8 sm:mt-8 3xl:mt-24"
            />
          }
        />
      </ScreenPadding>
      <ScreenFull>
        <div className="py-[2rem] xl:py-[5rem]">
          <TitleSeparate titleFirst="About" titleSecond="Us" />
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ImageBorder url="https://media.gettyimages.com/id/157315002/photo/snow-covered-house.jpg?s=612x612&w=gi&k=20&c=Z581v3Ovla_JumzZ7DlX_rooue85y9m5T-ARJ_HgawQ=" />
          <div>
            <div className="mb-6 text-2xl font-bold xl:text-5xl">
              We Are The Best And Trusted
              <span className="text-[#1252AE]"> Real Estate</span> Agent
            </div>
            <p className="mb-5 text-sm text-grey_4">
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat.
            </p>
            <p className="mb-7 text-sm text-grey_4">
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            <div>
              <ExpandableContent data={realEstateAgentDummyData} />
            </div>
          </div>
        </div>
      </ScreenFull>
      <ScreenFull className="py-10 xl:py-36">
        <div className="grid grid-cols-1 gap-x-32 gap-y-8 xl:grid-cols-2">
          <div className="">
            <div className="mb-6 text-2xl font-bold xl:text-5xl">
              We Are Offernig The Best Real Estate
              <span className="text-[#1252AE]"> Real Estate</span> Deals
            </div>
            <p className="mb-5 text-sm text-grey_4">
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat.
            </p>
            <p className="mb-7 text-sm text-grey_4">
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            {offerDummyData.map((item) => (
              <ArrowContent title={item} key={item} />
            ))}

            <ButtonHommey text="View More" className="mt-10 w-full lg:w-auto" />
          </div>

          <ImageBorder url="https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg" />
        </div>
      </ScreenFull>

      <ScreenFull className="pt-20">
        <RecentPropertySection />
      </ScreenFull>

      <ScreenPadding>
        <div className="py-10">
          <TitleSeparate titleFirst="Bundes" titleSecond="Länder" />
        </div>
        <div className="pb-16">
          <FederalStates />
        </div>
      </ScreenPadding>
      <ScreenFull>
        <div className="py-16">
          <Achievement />
        </div>
      </ScreenFull>
      <ScreenPadding>
        <TitleSeparate
          titleSecond="clients say"
          titleFirst="What our"
          className="mb-24 mt-16"
        />
        <div className="pb-10">
          <ClientSaySection />
        </div>
      </ScreenPadding>
      <ScreenFull className="pb-20">
        <TitleSeparate
          titleSecond="Properties"
          titleFirst="Featured "
          className="pb-24 pt-10"
        />
        <FeaturedPropertySection />
      </ScreenFull>
      <ScreenPadding>
        <div className="py-16">
          <ReviewEstate />
        </div>
      </ScreenPadding>
    </LayoutHommey>
  );
}
