import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "~/components/layouts";
import { question, settings, trash } from "~/assets";

const SettingList = [
  {
    id: 1,
    title: "General settings",
    description: "Einstellungen",
    color: "bg-purple",
    icon: settings,
    popOver: false,
    path: "",
  },
  {
    id: 2,
    title: "Support",
    description: "Hilfe, FAQ und Kontakt",
    color: "bg-red-400",
    icon: question,
    popOver: false,
    path: "",
  },
  {
    id: 1,
    title: "Delete",
    description: "Account löschen",
    color: "bg-white",
    icon: trash,
    popOver: true,
    path: "/setting/delete-account",
  },
];

export default function Setting() {
  const router = useRouter();
  return (
    <Layout>
      <div className="h-screen w-full bg-yellow-300 px-10 pt-28">
        {SettingList.map((item) => (
          <div
            className="relative mb-5 flex h-20 w-full cursor-pointer items-center justify-between rounded-3xl bg-white px-4 hover:bg-slate-100"
            key={item.id}
            onClick={() => router.push("/setting/delete-account")}
          >
            <div className="flex items-center">
              <div className="mr-8 flex h-[60px] w-[60px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-gray-200">
                <div
                  className={`flex h-[50px] w-[50px] items-center justify-center  rounded-s-full rounded-t-full border-2 ${item.color}`}
                >
                  <Image src={item.icon} alt="" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-xs font-semibold text-grey">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
