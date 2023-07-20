import dynamic from "next/dynamic";





const ObjectTypeScreen = dynamic(
  () => import("~/screen").then((module) => module.ObjectTypeScreen),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <ObjectTypeScreen />;
}