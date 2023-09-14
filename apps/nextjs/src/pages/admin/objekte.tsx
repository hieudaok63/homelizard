import dynamic from "next/dynamic";

import { Loading } from "~/components";

const ObjekteScreen = dynamic(
  () => import("~/screen").then((module) => module.ObjekteScreen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

const role = "user";

export default function AdminScreen() {
  if (role === "admin") {
    return <ObjekteScreen />;
  } else {
    return <p>error</p>;
  }
}
