import dynamic from "next/dynamic";

import { Loading } from "~/components";

const LandAreaScreen = dynamic(
  () => import("~/screen").then((module) => module.LandAreaScreen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <LandAreaScreen />;
}
