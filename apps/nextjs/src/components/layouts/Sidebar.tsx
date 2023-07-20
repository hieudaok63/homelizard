import Link from "next/link";

// import { useRouter } from "next/router";

import { sidebarLink } from "~/constants/topbarArr";

export default function SideBar() {
  // const router = useRouter();
  return (
    <div className="fixed mt-24 h-full w-[250px] bg-[#fcfcfc] px-4 py-6">
      {sidebarLink?.map((link) => (
        <Link
          href={link.path}
          key={link.id}
          className="flex items-center gap-[16px] rounded-2xl px-4 py-4 text-base font-semibold text-gray-500 transition-all hover:bg-blue-600 hover:text-white"
          //   onClick={() => router.push(`/${link.path}`)}
        >
          <span>{link.icon}</span>
          <span>{link.title}</span>
        </Link>
      ))}
    </div>
  );
}
