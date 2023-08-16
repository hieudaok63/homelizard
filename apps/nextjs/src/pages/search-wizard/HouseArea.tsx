import dynamic from "next/dynamic";

import { Loading } from "~/components";

const HouseArea = dynamic(
  () => import("~/screen").then((module) => module.HouseArea),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <HouseArea />;
}
