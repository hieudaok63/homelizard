import { useCallback, useState } from "react";

import { api } from "~/utils/api";
import Layout from "~/components/layouts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Loading } from "~/components";
import { SuchenItem, SuchenTab } from "./components";

export default function Suchen() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data, isLoading } = api.search.list.useQuery(undefined);

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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="flex h-full w-full justify-center bg-yellow-200 pt-28 ">
            <div className="w-full md:px-6 xl:px-16">
              <Accordion type="single" collapsible>
                {data?.map((data, index) => {
                  return (
                    <AccordionItem value={data.id.toString()} key={data.id}>
                      <AccordionTrigger>
                        <SuchenItem
                          data={data}
                          selected={selectedIndex === index}
                          onClick={() => onSelectItem(index)}
                        />
                      </AccordionTrigger>
                      <AccordionContent>
                        <SuchenTab data={data} />
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
