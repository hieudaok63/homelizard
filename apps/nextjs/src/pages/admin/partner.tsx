import dynamic from "next/dynamic";

import { Loading } from "~/components";

const PartnerScreen = dynamic(
  () => import("~/screen").then((module) => module.PartnerScreen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

const role = "user";

export default function AdminScreen() {
  if (role === "admin") {
    return <PartnerScreen />;
  } else {
    return <p>error</p>;
  }
}
