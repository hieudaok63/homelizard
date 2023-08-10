import dynamic from "next/dynamic";

import { Loading } from "~/components";

const Ergebnisse = dynamic(
  () => import("~/screen").then((module) => module.Ergebnisse),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <Ergebnisse />;
}
