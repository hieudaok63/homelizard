import dynamic from "next/dynamic";

const DashBoard = dynamic(
  () => import("~/screen").then((module) => module.Dashboard),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <DashBoard />;
}
