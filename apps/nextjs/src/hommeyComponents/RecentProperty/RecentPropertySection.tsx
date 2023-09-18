import ButtonHommey from "../ButtonHommey";
import TitleSeparate from "../TitleSeparate";
import RecentPropertyItem from "./RecentPropertyItem";

export const RecentPropertySection = () => {
  return (
    <section>
      <TitleSeparate
        titleFirst="Recent"
        titleSecond="Property Deals {curated_deals}"
        className="mb-16"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from(Array(8).keys()).map((item) => (
          <RecentPropertyItem key={item} />
        ))}
      </div>
      <div className="flex w-full items-center justify-center">
        <ButtonHommey
          text="Jetzt Immobilie in Memmingen finden"
          big
          icon
          className="mb-16 mt-14"
        />
      </div>
    </section>
  );
};
