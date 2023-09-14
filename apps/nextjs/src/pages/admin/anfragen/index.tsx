import dynamic from "next/dynamic";

import { Loading } from "~/components";

const AnfragenPage = dynamic(
  () =>
    import("~/screen/Admin/anfragen/AnfragenAdmin").then((module) => module),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

const role = "user";

export default function AdminScreen() {
  if (role === "admin") {
    return <AnfragenPage />;
  } else {
    return <p>error</p>;
  }
}
