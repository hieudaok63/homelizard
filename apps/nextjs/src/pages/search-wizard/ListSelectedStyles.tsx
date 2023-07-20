import dynamic from "next/dynamic";

const ListSelectedStyles = dynamic(
  () => import("~/screen").then((module) => module.ListSelectedStyles),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);
export default function ObjectType() {
  return <ListSelectedStyles />;
}
