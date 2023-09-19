import { type ParsedUrlQuery } from "querystring";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import {
  ScreenFull,
  ScreenPadding,
} from "~/components/LayoutHommey/components";
import { LayoutHommey } from "~/components";
import {
  Achievement,
  ButtonHommey,
  ChartPrice,
  CitySummary,
  FeaturedPropertySection,
  HeroBanner,
  History,
  HowItWork,
  Leben,
  ReviewEstate,
  TitleSeparate,
} from "~/hommeyComponents";
import { RecentPropertySection } from "~/hommeyComponents/RecentProperty";
import ClientSaySection from "~/hommeyComponents/WhatOurClientSay/ClientSaySection";
import { regionData, type Section } from "~/mocks/regionData";

type Region = (typeof regionData)[0];

interface IParams extends ParsedUrlQuery {
  cityName: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const paths = regionData.map((item) => ({
    params: {
      cityName: item.cityName.toLowerCase().replaceAll(" ", "-"),
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Region, IParams> = async ({
  params,
}) => {
  if (!params) throw new Error("params is undefined");
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const pageData = regionData.find(
    (item) =>
      item.cityName.toLowerCase().replaceAll(" ", "-") === params.cityName,
  );
  if (!pageData) throw new Error("regionData is undefined");

  // Pass post data to the page via props
  return { props: pageData };
};

const Region: NextPage<Region> = (data) => {
  const sectionsData = data.sections;

  const testImageUrl =
    "https://media.gettyimages.com/id/157315002/photo/snow-covered-house.jpg?s=612x612&w=gi&k=20&c=Z581v3Ovla_JumzZ7DlX_rooue85y9m5T-ARJ_HgawQ=";

  const dataBenefits = sectionsData?.find(
    (item) => item.id === "benefits",
  ) as Section;
  const dataLiving = sectionsData?.find(
    (item) => item.id === "living",
  ) as Section;
  const dataHistory = sectionsData?.find(
    (item) => item.id === "history",
  ) as Section; // data history need items as well (UI)

  // need price, curated_deals, testimonials, curated_offers

  // main return
  return (
    <LayoutHommey>
      <ScreenPadding>
        <HeroBanner
          title={`4-Zimmer Wohnung in ${data.cityName} mieten`}
          descriptions={[
            "Sie sind auf der Suche?",
            "Wir finden für jeden die passende Immobilie.",
          ]}
          ActionButton={
            <ButtonHommey
              text={`Jetzt Immobilie in ${data.cityName} finden`}
              big
              icon
              className="mt-8 sm:mt-8 3xl:mt-24"
            />
          }
        />
        <CitySummary title={data.cityName} summary={data.summary} />
      </ScreenPadding>
      <ScreenFull className="py-14 3xl:py-[5rem]">
        <TitleSeparate
          titleSecond={`Leben in ${data.cityName}`}
          className="mb-16"
        />
        <Leben
          {...dataBenefits}
          imageUrl={dataBenefits?.imageUrl || testImageUrl}
        />
      </ScreenFull>
      {/* <ScreenPadding className="py-3 sm:py-6 3xl:py-[5rem]">
        <ChartPrice />
      </ScreenPadding> */}
      <ScreenFull className="py-10">
        <TitleSeparate
          titleSecond={`Wohnen in ${data.cityName}`}
          className="mb-16"
        />
        <Leben
          {...dataLiving}
          imageUrl={dataLiving?.imageUrl || testImageUrl}
          reverse
        />
      </ScreenFull>
      {/* <ScreenPadding className="my-10">
        <TitleSeparate
          titleSecond={`Entwicklung von ${data.cityName}`}
          className="mb-16 mt-10"
        />
        <History {...dataHistory} />
      </ScreenPadding> */}
      {/* <ScreenFull className="pt-20">
        <RecentPropertySection />
      </ScreenFull> */}
      <ScreenPadding>
        <div className="my-20">
          <HowItWork />
        </div>
      </ScreenPadding>
      <ScreenFull>
        <div className="py-16">
          <Achievement />
        </div>
      </ScreenFull>
      <ScreenPadding>
        <TitleSeparate
          titleSecond="clients say {testimonials}"
          titleFirst="What our"
          className="mb-24 mt-16"
        />
        <div className="pb-10">
          <ClientSaySection />
        </div>
      </ScreenPadding>
      {/* <ScreenFull className="pb-20">
        <TitleSeparate
          titleSecond="Properties {curated_offers} "
          titleFirst="Featured "
          className="pb-24 pt-10"
        />
        <FeaturedPropertySection />
      </ScreenFull> */}
      <ScreenPadding className="my-20">
        <ReviewEstate />
      </ScreenPadding>
    </LayoutHommey>
  );
};

export default Region;
