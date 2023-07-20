import dynamic from "next/dynamic";

const NumberRooms = dynamic(
  () => import("~/screen").then((module) => module.NumberRooms),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <NumberRooms />;
}
