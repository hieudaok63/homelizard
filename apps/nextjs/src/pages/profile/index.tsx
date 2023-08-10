import dynamic from "next/dynamic";

import Layout from "~/components/layouts";
import { useToggleStore } from "~/zustand/store";

const MyProfile = dynamic(
  () => import("~/screen/Profile/myProfile/my-profile"),
  {
    ssr: false,
  },
);
const ObjectProfile = dynamic(
  () => import("~/screen/Profile/objectProfile/object-profile"),
  {
    ssr: false,
  },
);

export default function Home() {
  const toggleBtn = useToggleStore((state) => state.toggleButton);
  return (
    <Layout>
      <div className=" bg-bg_home">
        {!toggleBtn ? <MyProfile /> : <ObjectProfile />}
      </div>
    </Layout>
  );
}
