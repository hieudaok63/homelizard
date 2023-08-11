import dynamic from "next/dynamic";

import { Loading } from "~/components";

const NumberRooms = dynamic(
  () => import("~/screen").then((module) => module.NumberRooms),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <NumberRooms />;
}
