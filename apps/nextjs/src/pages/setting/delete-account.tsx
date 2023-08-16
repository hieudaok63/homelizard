import dynamic from "next/dynamic";

import { Loading } from "~/components";

const DeleteAccount = dynamic(
  () => import("~/screen/Setting/DeleteAccount").then((module) => module),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <DeleteAccount />;
}
