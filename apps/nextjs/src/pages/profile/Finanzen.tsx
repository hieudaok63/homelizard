import dynamic from "next/dynamic";

import { Loading } from "~/components";

const Finanzen = dynamic(
  () => import("~/screen").then((module) => module.Finanzen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <Finanzen />;
}
