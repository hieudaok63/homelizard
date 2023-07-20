import dynamic from "next/dynamic";





const PurchasePrice = dynamic(
  () => import("~/screen").then((module) => module.PurchasePrice),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <PurchasePrice />;
}