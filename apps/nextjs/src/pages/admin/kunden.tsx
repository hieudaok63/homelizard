import dynamic from "next/dynamic";

import { Loading } from "~/components";

const KundenScreen = dynamic(
  () => import("~/screen").then((module) => module.KundenScreen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

const role = "user";

export default function AdminScreen() {
  if (role === "admin") {
    return <KundenScreen />;
  } else {
    return <p>error</p>;
  }
}
