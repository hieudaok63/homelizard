import { ButtonHommey, ExpandableContent } from "~/hommeyComponents";
import { type Section } from "~/mocks/regionData";

export default function History({ description, title, items }: Section) {
  return (
    <div className="items-top flex flex-wrap">
      <div className="xl:w-[60%]">
        <p className="mb-6 text-2xl font-bold md:text-3xl xl:text-[2.5rem]">
          {title}
        </p>
        <p className="mb-6 w-full text-sm text-[#737D8C] xl:mb-28 xl:w-3/4">
          {description}
        </p>
        <ButtonHommey text="Jetzt Immobilie finden" icon big />
      </div>
      <div className="mt-6 w-full xl:mt-0 xl:h-[31.25rem] xl:w-[40%]">
        {items?.map((item) => (
          <ExpandableContent
            key={item.title}
            title={item.title}
            desc={item.content}
          />
        ))}
      </div>
    </div>
  );
}
