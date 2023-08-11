import dynamic from "next/dynamic";

import { Loading } from "~/components";

const Suchen = dynamic(
  () => import("~/screen").then((module) => module.Suchen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <Suchen />;
}
