import { cn } from "@homelizard/tailwind-config/utils";

import { useToggleStore } from "~/zustand/store";
import { SideBar, TopBar } from "./components";

interface ILayoutHome {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutHome) {
  const toggleSideBar = useToggleStore((state) => state.toggleSideBar);
  return (
    <div className="h-screen w-full ">
      <div className="fixed right-0 z-10 h-24 w-full bg-white">
        <TopBar />
      </div>
      <div
        className={cn(
          "min grid h-full transition-all duration-500",
          !toggleSideBar
            ? "grid-cols-[250px_minmax(0,1fr)]"
            : " grid-cols-[80px_minmax(0,1fr)]",
        )}
      >
        <div>
          <SideBar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
