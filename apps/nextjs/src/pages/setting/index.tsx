import dynamic from "next/dynamic";

import { Loading } from "~/components";

const Setting = dynamic(
  () => import("~/screen/Setting/Setting").then((module) => module),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

export default function ObjectType() {
  return <Setting />;
}
