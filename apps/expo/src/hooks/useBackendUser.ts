import { useUserStore } from "~/zustand/store";

export const useBackendUser = () => {
  const user = useUserStore((state) => state?.userData);
  return user;
};
