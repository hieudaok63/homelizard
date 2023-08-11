import dynamic from "next/dynamic";

import { Loading } from "~/components";

const PersonalData = dynamic(
  () => import("~/screen").then((module) => module.PersonalData),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
export default function ObjectType() {
  return <PersonalData />;
}
