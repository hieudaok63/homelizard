interface LayoutSearchSearch {
  children: React.ReactNode;
}

export default function LayoutSearch({ children }: LayoutSearchSearch) {
  return (
    <div className="h-screen w-full p-4 bg-white xl:p-10 2xl:px-12 2xl:py-4">
      {children}
    </div>
  );
}
