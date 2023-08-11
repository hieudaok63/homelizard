import dynamic from "next/dynamic";

import { Loading } from "~/components";

const ObjectTypeScreen = dynamic(
  () => import("~/screen").then((module) => module.ObjectTypeScreen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <ObjectTypeScreen />;
}
