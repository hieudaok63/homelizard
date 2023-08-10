import dynamic from "next/dynamic";

import { Loading } from "~/components";

const RentalPrice = dynamic(
  () => import("~/screen").then((module) => module.RentalPrice),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <RentalPrice />;
}
