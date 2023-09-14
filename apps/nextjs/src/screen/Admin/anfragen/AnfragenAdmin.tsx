import LayoutAdmin from "~/components/LayoutAdmin";
import { useToggleStore } from "~/zustand/store";
import AnfragenDetail from "./AnfragenDetail";
import AnfragenScreen from "./AnfragenScreen";

export default function AnfragenAdmin() {
  const toggleDetailAdmin = useToggleStore((state) => state.toggleDetailAdmin);

  return (
    <LayoutAdmin>
      {toggleDetailAdmin ? <AnfragenDetail /> : <AnfragenScreen />}
    </LayoutAdmin>
  );
}
