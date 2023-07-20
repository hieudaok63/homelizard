import SideBar from "./Sidebar";
import Topbar from "./Topbar";

interface ILayoutHome {
  children: React.ReactNode;
}

export default function LayoutHome({ children }: ILayoutHome) {
  return (
    <div className="h-full w-full">
      <div className="fixed right-0 z-10 h-24 w-full bg-white">
        <Topbar />
      </div>
      <div className="min grid h-full grid-cols-[250px_minmax(0,1fr)]">
        <div>
          <SideBar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
