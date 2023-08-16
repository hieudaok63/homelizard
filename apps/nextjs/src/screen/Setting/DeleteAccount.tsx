import Layout from "~/components/layouts";
import { useToggleStore } from "~/zustand/store";
import { ConfirmDelete, ContactAccount } from "./components";

export default function DeleteAccount() {
  const toggleBtn = useToggleStore((state) => state.toggleButton);
  console.log(toggleBtn);
  return (
    <Layout>
      <div className="flex h-screen w-full justify-center bg-bg_home pt-28">
        {toggleBtn === false ? <ContactAccount /> : <ConfirmDelete />}
      </div>
    </Layout>
  );
}
