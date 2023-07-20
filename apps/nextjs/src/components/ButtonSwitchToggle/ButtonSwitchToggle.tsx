import { cn } from "@homelizard/tailwind-config/utils";

import { useSearchWizardStore } from "~/zustand/store";

export default function ButtonSwitchToggle() {
  const buttonType = useSearchWizardStore((state) => state?.toggleType);
  const setButtonType = useSearchWizardStore((state) => state?.setToggleType);
  return (
    <>
      <div
        className={cn(
          "flex h-[50px] w-[140px] cursor-pointer items-center justify-between rounded-[50px] border-2 border-gray-300 bg-slate-100 p-1 drop-shadow-lg",
          buttonType === "Kaufen" && "flex-row-reverse",
        )}
        onClick={() => {
          if (buttonType === "Kaufen") {
            setButtonType("Mieten");
          } else {
            setButtonType("Kaufen");
          }
        }}
      >
        <span className="select-none p-4 text-lg">{buttonType}</span>
        <div className="h-11 w-11 rounded-full bg-black_2 "></div>
      </div>
    </>
  );
}
