import { useToggleBtnStore } from "~/zustand/store";

export default function ButtonToggleHome() {
  const toggleBtn = useToggleBtnStore((state) => state.toggleButton);
  const setToggleBtn = useToggleBtnStore((state) => state.setToggleButton);

  return (
    <div
      className="flex h-[68px] w-[360px] cursor-pointer select-none items-center rounded-full bg-black_1 p-[3px]"
      onClick={() => setToggleBtn(!toggleBtn)}
    >
      <div
        className={`h-full w-[180px] ${
          toggleBtn && "translate-x-[174px]"
        } flex items-center justify-center rounded-full bg-white transition-all duration-150`}
      >
        <span className=" font-bold">
          {toggleBtn ? "Ergebnisse" : "Dashboard"}
        </span>
      </div>
      <div
        className={`h-full w-[170px] ${
          toggleBtn && "translate-x-[-174px]"
        } flex items-center justify-center rounded-full text-white transition-all duration-150`}
      >
        <span className=" font-bold">
          {toggleBtn ? "Dashboard" : "Ergebnisse"}
        </span>
      </div>
    </div>
  );
}
