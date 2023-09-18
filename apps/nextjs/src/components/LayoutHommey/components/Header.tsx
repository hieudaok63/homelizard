import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { LogoHomelizard } from "~/assets";
import MenuLinkHeader from "./MenuLinkHeader";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between px-3 py-7 sm:px-6 lg:px-24 3xl:px-[18.75rem]">
      <div className="flex items-center">
        <Link
          href="/"
          className="w-[130px] md:mr-8 md:w-[200px] xl:mr-10 2xl:mr-16 2xl:w-[260px]"
        >
          <Image
            src={LogoHomelizard}
            alt="Logo"
            className="w-full cursor-pointer"
          />
        </Link>

        <MenuLinkHeader className="hidden w-[260px] items-center justify-between md:flex lg:w-[260px] xl:w-[280px] 2xl:w-[300px]" />
      </div>
      <div className="flex md:block">
        <Button
          asChild
          className=" h-[26px] w-[60px]  cursor-pointer rounded-sm bg-white  p-0 text-xs font-normal text-grey_4 hover:bg-white md:h-[36px] md:w-[90px] md:text-base 2xl:h-[40px] 2xl:w-[110px] 2xl:text-xl"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button
          asChild
          className="h-[26px] w-[60px] rounded-sm bg-[#1252ae26] p-0 text-xs font-normal text-blue-700 shadow-sm hover:bg-[#114da125] md:h-[36px] md:w-[90px] md:text-base 2xl:h-[40px] 2xl:w-[110px] 2xl:text-xl"
        >
          {/* navigate to the first step of search wizard */}
          <Link href="/search-wizard/ObjectType">Sign up</Link>
        </Button>
      </div>
      {/* Mobile screen menu */}
      <Sheet>
        <SheetTrigger className="ml-3 block rounded-md border px-2 text-base text-blue_6 md:hidden">
          Menu
        </SheetTrigger>
        <SheetContent className="w-[70%] bg-bg_home">
          <MenuLinkHeader underlined />
        </SheetContent>
      </Sheet>
    </header>
  );
}
