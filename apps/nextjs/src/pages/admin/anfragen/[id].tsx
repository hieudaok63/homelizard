import dynamic from "next/dynamic";

import LayoutAdmin from "~/components/LayoutAdmin";

const AdminDetail = dynamic(
  () =>
    import("~/screen/Admin/anfragen/AnfragenDetail").then((module) => module),
  {
    ssr: false,
  },
);
const role = "user";

export default function AdminScreen() {
  if (role === "admin") {
    return (
      <LayoutAdmin>
        <AdminDetail />
      </LayoutAdmin>
    );
  } else {
    return <p>error</p>;
  }
}
