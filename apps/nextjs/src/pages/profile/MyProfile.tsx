import dynamic from "next/dynamic";

import { Loading } from "~/components";

const MyProfile = dynamic(
  () => import("~/screen").then((module) => module.MyProfile),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <MyProfile />;
}
