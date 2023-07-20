import dynamic from "next/dynamic";

const ConstructionYear = dynamic(
  () => import("~/screen").then((module) => module.ConstructionYear),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <ConstructionYear />;
}
