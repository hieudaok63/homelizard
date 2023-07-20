import dynamic from "next/dynamic";





const LandAreaScreen = dynamic(
  () => import("~/screen").then((module) => module.LandAreaScreen),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <LandAreaScreen />;
}