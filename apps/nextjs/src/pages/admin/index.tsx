"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Loading } from "~/components";

const AdminPage = dynamic(
  () => import("~/screen").then((module) => module.AdminHomeScreen),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

export default function AdminScreen() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }

  if (user?.publicMetadata?.role === "ADMIN") {
    return <AdminPage />;
  } else {
    router.push("/");
  }
}
