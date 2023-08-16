import Image from "next/image";
import Link from "next/link";

import { cn } from "@homelizard/tailwind-config/utils";

import { Create, Heart, Setting, Tell } from "~/assets";
import Chevron from "~/assets/icons/chevron-up.svg";
import {
  PATH_FAVORITE,
  PATH_OBJECTTYPE,
  PATH_SETTING,
} from "~/constants/navigation";
import { useToggleStore } from "~/zustand/store";

const menuSideBar = [
  {
    id: 1,
    title: "Favorites",
    icon: Heart,
    color: "bg-pink",
    path: PATH_FAVORITE,
  },
  {
    id: 2,
    title: "Tell-a-friend",
    icon: Tell,
    color: "bg-blue_3",
    path: "",
  },
  {
    id: 3,
    title: "Create new search",
    icon: Create,
    color: "bg-purple",
    path: PATH_OBJECTTYPE,
  },
  {
    id: 4,
    title: "Settings",
    icon: Setting,
    color: "bg-yellow-300",
    path: PATH_SETTING,
  },
];

export default function SideBar() {
  const toggleSideBar = useToggleStore((state) => state.toggleSideBar);
  const setToggleSideBar = useToggleStore((state) => state.setToggleSideBar);

  return (
    <div className="fixed">
      <div
        className={cn(
          "mt-28 h-full",
          !toggleSideBar ? "w-[250px]" : "w-[70px]",
        )}
      >
        <div className="flex px-4">
          <Image
            src={Chevron}
            alt=""
            className={cn(
              "h-8 w-8 cursor-pointer",
              !toggleSideBar ? "rotate-[-90deg]" : "rotate-90",
            )}
            onClick={() => setToggleSideBar(!toggleSideBar)}
          />
        </div>
        {menuSideBar?.map((menu) => (
          <Link
            href={menu.path}
            key={menu.id}
            className={cn(
              "mt-6 flex items-center justify-start gap-[16px] rounded-3xl px-4 py-2 text-base font-semibold ",
              !toggleSideBar ? "hover:bg-slate-100" : "hover:scale-105",
            )}
          >
            <div className="w-10">
              <div
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-s-full rounded-t-full ${menu.color}`}
              >
                <Image className="" src={menu.icon} alt="favorite" />
              </div>
            </div>

            <span
              className={cn(
                "transition-all duration-100 ",
                toggleSideBar ? "hidden" : "",
              )}
            >
              {menu.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
