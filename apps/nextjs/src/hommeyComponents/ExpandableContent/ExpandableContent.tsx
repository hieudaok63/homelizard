import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { check } from "~/assets/iconsMarketting";
import { type ItemInSection } from "~/mocks/regionData";

interface IToggleDrop {
  data?: ItemInSection[];
}

export default function ExpandableContent({ data }: IToggleDrop) {
  return (
    <div className="w-auto 3xl:w-[33.5rem]">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={data?.[0]?.title} // first item is opened by default
      >
        {data?.map((item) => (
          <AccordionItem
            value={item.title}
            key={item.title}
            className="mb-3 h-auto w-full rounded-sm border border-[#D4DCE5] p-5"
          >
            <div className="flex items-center">
              <AccordionTrigger>
                <Image src={check} alt="" className="mr-5" />
                <p className="text-left text-lg font-normal">{item.title}</p>
              </AccordionTrigger>
            </div>

            <AccordionContent className="ml-14 mt-2 text-sm text-[#737D8C]">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
