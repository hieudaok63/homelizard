import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth, useSession } from "@clerk/nextjs";

import Layout from "~/components/layouts";
import { PATH_SIGN_IN } from "~/constants/navigation";
import { Dashboard, Ergebnisse } from "~/screen";
import { useToggleStore } from "~/zustand/store";

export default function Home() {
  const toggleBtn = useToggleStore((state) => state.toggleButton);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { session } = useSession();

  useEffect(() => {
    !isSignedIn && router.push(`${PATH_SIGN_IN}`);
  }, [session]);
  return (
    <Layout>
      <div className=" bg-bg_home">
        {!toggleBtn ? <Dashboard /> : <Ergebnisse />}
      </div>
    </Layout>
  );
}
