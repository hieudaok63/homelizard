import dynamic from "next/dynamic";

const CalendarSearch = dynamic(
  () => import("~/screen").then((module) => module.CalendarSearch),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

export default function ObjectType() {
  return <CalendarSearch />;
}
