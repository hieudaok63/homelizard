import dynamic from "next/dynamic";





const HouseArea = dynamic(
  () => import("~/screen").then((module) => module.HouseArea),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <HouseArea />;
}