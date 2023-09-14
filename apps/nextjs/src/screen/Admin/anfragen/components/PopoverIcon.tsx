import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Question from "~/assets/icons/questionmark.svg";

const interessentenList = [
  {
    Nachname: "Salzmann",
    Vorname: "Veronika",
    AnfrageAm: "17.07.2023",
  },
  {
    Nachname: "Koberen",
    Vorname: "Erik",
    AnfrageAm: "17.07.2023",
  },
  {
    Nachname: "Gazdag",
    Vorname: "Zoltán",
    AnfrageAm: "17.07.2023",
  },
];

export const PopoverIcon = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = api.request.byId.useQuery({ searchRequestId: id as string });
  const result = data?.find((item) => item);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Image
            src={Question}
            alt=""
            className="absolute bottom-3 right-5 cursor-pointer hover:scale-105"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[500px] rounded-2xl shadow-xl">
          <div>
            <p className="mb-4 text-lg font-bold">Interessenten</p>
            <div className="flex items-center border-b-[2px] py-2 text-sm text-grey">
              <span className="w-[33%]">Nachname</span>
              <span className="w-[33%]">Vorname</span>
              <span className="w-[33%]">Anfrage am</span>
            </div>
            {interessentenList.map((item, index) => (
              <div
                className="flex items-center border-b-[1px] py-2 font-normal"
                key={index}
              >
                <span className="w-[33%]">{item.Nachname}</span>
                <span className="w-[33%]">{item.Vorname}</span>
                <span className="w-[33%]">{item.AnfrageAm}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
