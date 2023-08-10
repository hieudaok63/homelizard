import dynamic from "next/dynamic";

import { Loading } from "~/components";

const ObjectProfile = dynamic(
  () => import("~/screen").then((module) => module.ObjectProfile),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <ObjectProfile />;
}
