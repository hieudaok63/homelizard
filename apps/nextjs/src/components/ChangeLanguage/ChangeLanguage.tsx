import Image from "next/image";
import { useTranslation } from "react-i18next";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import language from "~/assets/icons/language.svg";

export default function ChangeLanguage() {
  // i18n
  const { i18n } = useTranslation();
  return (
    <Popover>
      <div className="mr-4 flex cursor-pointer items-center">
        <PopoverTrigger className="flex items-center">
          <Image src={language} alt="Message" className="w-4" />
          <span className="w-6 text-sm text-black_1">
            {i18n.language === "de" ? "DE" : "EN"}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-[150px]">
          <div
            className="cursor-pointer border-b-[1px] hover:text-blue_1"
            onClick={() => i18n.changeLanguage("en")}
          >
            English
          </div>
          <div
            className="cursor-pointer  hover:text-blue_1"
            onClick={() => i18n.changeLanguage("de")}
          >
            German
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
