import dynamic from "next/dynamic";

import { Loading } from "~/components";

const DashBoard = dynamic(
  () => import("~/screen").then((module) => module.Dashboard),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <DashBoard />;
}
