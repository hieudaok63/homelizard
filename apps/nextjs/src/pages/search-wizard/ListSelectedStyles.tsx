import dynamic from "next/dynamic";

import { Loading } from "~/components";

const ListSelectedStyles = dynamic(
  () => import("~/screen").then((module) => module.ListSelectedStyles),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <ListSelectedStyles />;
}
