import dynamic from "next/dynamic";

import { Loading } from "~/components";

const Favorite = dynamic(
  () => import("~/screen").then((module) => module.Favorite),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <Favorite />;
}
