import dynamic from "next/dynamic";

const Ergebnisse = dynamic(
  () => import("~/screen").then((module) => module.Ergebnisse),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <Ergebnisse />;
}
