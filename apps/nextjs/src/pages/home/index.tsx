import LayoutHome from "~/components/layouts";
import { Dashboard, Ergebnisse } from "~/screen";
import { useToggleBtnStore } from "~/zustand/store";

export default function Home() {
  const toggleBtn = useToggleBtnStore((state) => state.toggleButton);
  return (
    <LayoutHome>
      <div className=" bg-[#f5f5f5]">
        {!toggleBtn ? <Dashboard /> : <Ergebnisse />}
      </div>
    </LayoutHome>
  );
}
