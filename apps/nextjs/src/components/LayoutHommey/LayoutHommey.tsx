import { Footer, Header } from "./components";

interface IPropsLayoutHommey {
  children: React.ReactNode;
}

export default function LayoutHommey({ children }: IPropsLayoutHommey) {
  return (
    <div className="h-screen w-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
