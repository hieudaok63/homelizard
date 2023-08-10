import dynamic from "next/dynamic";

import { Loading } from "~/components";

const LocationScreen = dynamic(
  () => import("~/screen").then((module) => module.LocationScreen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <LocationScreen />;
}
