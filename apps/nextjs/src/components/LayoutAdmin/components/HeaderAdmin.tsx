import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import { cn } from "@homelizard/tailwind-config/utils";

import { Button } from "~/components/ui";
import { logoAdmin } from "~/assets";

export default function HeaderAdmin() {
  const currentRoute = usePathname();
  const router = useRouter();

  const linkStyle = "border-b-2 border-blue-800 text-blue-800";
  const notifyStyle =
    "absolute right-[-16px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white";

  return (
    <div className="mb-4 flex items-start justify-between py-6">
      <div className="flex items-start">
        <div className="flex flex-col items-center">
          <div>
            <Image
              alt=""
              src={logoAdmin}
              width={220}
              onClick={() => router.push("/admin")}
              className="cursor-pointer"
            />
          </div>
          <span className="font-bold text-purple">ADMIN</span>
        </div>
        <div className="ml-16">
          <nav className="flex items-center justify-center ">
            <Link
              href="/admin/kunden"
              className={cn(
                "relative mr-10 text-lg",
                currentRoute === "/admin/kunden" ? linkStyle : "text-gray-600",
              )}
            >
              Kunden
            </Link>

            <Link
              href="/admin/objekte"
              className={cn(
                "relative mr-10 text-lg",
                currentRoute === "/admin/objekte" ? linkStyle : "text-gray-600",
              )}
            >
              Objekte
            </Link>

            <Link
              href="/admin/partner"
              className={cn(
                "relative mr-10 border-0 text-lg",
                currentRoute === "/admin/partner" ? linkStyle : "text-gray-600",
              )}
            >
              Partner
            </Link>
            <Link
              href="/admin/anfragen"
              className={cn(
                "relative text-lg",
                router.pathname.includes("/admin/anfragen")
                  ? linkStyle
                  : "text-gray-600",
              )}
            >
              Anfragen
              <span className={notifyStyle}>5</span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-5 text-base text-gray-600">Hallo, Dylan!</span>
        <Button className="h-10 w-[110px] bg-blue-100 text-lg text-blue-800 shadow-lg transition-all duration-200 hover:bg-blue-200">
          ausloggen
        </Button>
      </div>
    </div>
  );
}
