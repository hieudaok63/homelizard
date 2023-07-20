import dynamic from "next/dynamic";





const LocationScreen = dynamic(
  () => import("~/screen").then((module) => module.LocationScreen),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <LocationScreen />;
}