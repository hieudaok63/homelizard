import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@homelizard/tailwind-config/utils";

interface IProps {
  className?: string;
  underlined?: boolean;
}

const Underlined = () => {
  return (
    <div className="relative h-[2px] w-full animate-fadeIn rounded-3xl bg-blue-700">
      <div className="absolute left-[35%] h-full w-[12%] bg-white"></div>
      <div className="absolute left-[76%] h-full w-[12%] bg-white"></div>
    </div>
  );
};

export default function MenuLinkHeader({ className, underlined }: IProps) {
  const currentRoute = usePathname();

  const MenuCss = "2xl:text-xl text-lg font-normal tracking-wide text-grey_4";
  return (
    <nav className={className}>
      <div className="relative">
        <Link
          href="/"
          className={cn(MenuCss, currentRoute === "/" && "text-blue_6")}
        >
          Home
        </Link>
        {currentRoute === "/" && <Underlined />}
      </div>
      <div className="relative">
        <Link
          href="/regionen/landsberg-am-lech"
          className={cn(
            MenuCss,
            currentRoute.startsWith("/regionen/") && "text-blue_6",
          )}
        >
          Regionen
        </Link>
        {currentRoute.startsWith("/regionen/") && <Underlined />}
      </div>
      <div className="relative">
        <Link
          href="/hommey/editorials"
          className={cn(
            MenuCss,
            currentRoute === "/hommey/editorials" && "text-blue_6",
          )}
        >
          Editorials
        </Link>
        {currentRoute === "/hommey/editorials" && <Underlined />}
      </div>
    </nav>
  );
}
