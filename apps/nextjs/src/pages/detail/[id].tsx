import dynamic from "next/dynamic";

import { Loading } from "~/components";

const Detail = dynamic(
  () => import("~/screen/Detail").then((module) => module),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

export default function ObjectType() {
  return <Detail />;
}
