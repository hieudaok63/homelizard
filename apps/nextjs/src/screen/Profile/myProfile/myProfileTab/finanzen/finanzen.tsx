import { useCallback, useState } from "react";

import Layout from "~/components/layouts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FinanzenData } from "~/mocks";
import {
  FinanzenItem,
  FinanzenMenu,
  FinanzenTabBottom,
  FinanzenTabTop,
} from "./components";

export default function Finanzen() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSelectItem = useCallback(
    (index: number) => {
      if ((selectedIndex === 0 || selectedIndex) && selectedIndex === index) {
        setSelectedIndex(null);
        return;
      }

      setSelectedIndex(index);
    },
    [selectedIndex],
  );
  return (
    <Layout>
      <div className="h-full w-full bg-yellow-200 pt-28 ">
        <div className="w-full py-8 md:px-6 xl:px-16">
          <FinanzenTabTop />
          <div className="mt-8">
            {FinanzenData?.map((data, index) => {
              return (
                <Accordion type="single" collapsible key={data.id}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <FinanzenTabBottom
                        data={data}
                        selected={selectedIndex === index}
                        onClick={() => onSelectItem(index)}
                      />
                    </AccordionTrigger>
                    <div className="mb-3">
                      <AccordionContent>
                        {data.subFinanzen.map((item) => (
                          <FinanzenItem data={item} key={item.id} />
                        ))}
                      </AccordionContent>
                      <AccordionContent>
                        {data?.chilFinanzenTab?.map((val: any) => (
                          <FinanzenMenu
                            titleClassName="font-normal"
                            type="sub-main"
                            key={val.id}
                            data={val}
                          />
                        ))}
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
