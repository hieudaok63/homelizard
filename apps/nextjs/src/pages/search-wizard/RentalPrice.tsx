import dynamic from "next/dynamic";





const RentalPrice = dynamic(
  () => import("~/screen").then((module) => module.RentalPrice),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <RentalPrice />;
}