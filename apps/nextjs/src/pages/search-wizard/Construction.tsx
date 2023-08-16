import dynamic from "next/dynamic";

import { Loading } from "~/components";

const ConstructionYear = dynamic(
  () => import("~/screen").then((module) => module.ConstructionYear),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <ConstructionYear />;
}
