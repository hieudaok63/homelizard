import HeaderAdmin from "./components";

interface ILayoutAdmin {
  children: React.ReactNode;
}

export default function LayoutAdmin({ children }: ILayoutAdmin) {
  return (
    <div className="px-12">
      <HeaderAdmin />
      {children}
    </div>
  );
}
