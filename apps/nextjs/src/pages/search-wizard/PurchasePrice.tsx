import dynamic from "next/dynamic";

import { Loading } from "~/components";

const PurchasePrice = dynamic(
  () => import("~/screen").then((module) => module.PurchasePrice),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <PurchasePrice />;
}
