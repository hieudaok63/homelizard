import { useToggleStore } from "~/zustand/store";

interface IToggleBtn {
  leftContent: string;
  rightContent: string;
}

export default function ButtonToggleHome({
  leftContent,
  rightContent,
}: IToggleBtn) {
  const toggleBtn = useToggleStore((state) => state.toggleButton);
  const setToggleBtn = useToggleStore((state) => state.setToggleButton);

  return (
    <div
      className="flex h-[56px] w-[200px] cursor-pointer select-none items-center rounded-full bg-black_1 p-[3px] xl:h-[68px] xl:w-[360px]"
      onClick={() => setToggleBtn(!toggleBtn)}
    >
      <div
        className={`h-full w-[140px] xl:w-[180px] ${
          toggleBtn && "translate-x-[97px] xl:translate-x-[174px]"
        } flex items-center justify-center rounded-full bg-white transition-all duration-150`}
      >
        <span className=" font-bold">
          {toggleBtn ? rightContent : leftContent}
        </span>
      </div>
      <div
        className={`h-full w-[140px] xl:w-[170px] ${
          toggleBtn && " translate-x-[-100px] xl:translate-x-[-174px]"
        } flex items-center justify-center rounded-full text-white transition-all duration-150`}
      >
        <span className=" font-bold">
          {toggleBtn ? leftContent : rightContent}
        </span>
      </div>
    </div>
  );
}
