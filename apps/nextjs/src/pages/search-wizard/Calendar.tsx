import dynamic from "next/dynamic";

import { Loading } from "~/components";

const CalendarSearch = dynamic(
  () => import("~/screen").then((module) => module.CalendarSearch),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

export default function ObjectType() {
  return <CalendarSearch />;
}
