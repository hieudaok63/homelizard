import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { objectTypeOptions } from "@homelizard/schema";

import { Check, Haus, MHF } from "~/assets";
import {
  ArrowBack,
  ButtonSearchWizard,
  ButtonSwitchToggle,
} from "~/components";
import { PATH_LOCATION } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";
import { useSearchWizardStore } from "~/zustand/store";

const CheckObject = () => (
  <div className="absolute right-2 top-1 rounded-full bg-white">
    <Image src={Check} alt="check" />
  </div>
);

export default function ObjectTypeScreen() {
  const { t } = useTranslation("search");
  const objectType = useSearchWizardStore((state) => state?.objectTypes[0]);
  const setObjectTypes = useSearchWizardStore((state) => state?.setObjectTypes);

  const [option, setOption] = useState<boolean>(false);

  const menuRef: any = useRef();

  useEffect(() => {
    const handler = (e: { target: any }) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOption(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <LayoutSearch>
      <ArrowBack
        text={t("search.label.weSearch")}
        content={t("search.label.objectType")}
        subContent={t("search.text.selectObjectType")}
      />
      <div className="mb-14 mt-6 flex w-full justify-center">
        <ButtonSwitchToggle />
      </div>

      <div className="flex w-full items-center justify-between xl:justify-around ">
        <ObjectTypeButton
          onClick={() => setObjectTypes(["house_detached"])}
          selected={objectType === "house_detached"}
          icon={<Image src={Haus} alt={t("search.button.house")} />}
          title={t("search.button.house")}
        />
        <ObjectTypeButton
          onClick={() => setObjectTypes(["Multi-Family house"])}
          selected={objectType === "Multi-Family house"}
          icon={<Image src={MHF} alt={t("search.button.multiHouse")} />}
          title={t("search.button.multiHouse")}
        />
        <div
          className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home p-4 text-center hover:bg-slate-100 xl:w-32 ${
            objectType !== "house_detached" &&
            objectType !== "Multi-Family house" &&
            "shadow-lg shadow-slate-600"
          }`}
          onClick={() => setOption(!option)}
        >
          <span className="mt-3 select-none text-xl font-bold">
            {objectType &&
            objectType !== "house_detached" &&
            objectType !== "Multi-Family house"
              ? objectType
              : "Mehr Optionen"}
          </span>

          {objectType &&
            objectType !== "house_detached" &&
            objectType !== "Multi-Family house" && <CheckObject />}

          {option && (
            <div
              className="absolute top-[100%] rounded-t-3xl border-[1px] bg-white shadow-2xl"
              ref={menuRef}
            >
              <p className="cursor-default border-b-[1px] py-3 text-lg text-gray-400">
                Residence type
              </p>
              {objectTypeOptions?.map((item) => (
                <div
                  key={item}
                  onClick={() => setObjectTypes([item])}
                  className="w-[200px] select-none border-b-[1px] p-1 text-blue_1  hover:bg-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" flex w-full justify-center">
        <ButtonSearchWizard
          title="Continue"
          path={PATH_LOCATION}
          disabled={!objectType}
        />
      </div>
    </LayoutSearch>
  );
}

type ObjectTypeButtonProps = {
  onClick: () => void;
  selected: boolean;
  icon: ReactNode;
  title: string;
};

const ObjectTypeButton = ({
  onClick,
  selected,
  icon,
  title,
}: ObjectTypeButtonProps) => {
  return (
    <div
      className={`relative flex h-[160px] w-28 cursor-pointer flex-col items-center justify-center rounded-3xl bg-bg_home hover:bg-slate-100 xl:w-32 ${
        selected && "shadow-lg shadow-slate-600"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="mt-3 text-xl font-bold">{title}</span>
      {selected && <CheckObject />}
    </div>
  );
};
