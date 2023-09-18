import { cn } from "@homelizard/tailwind-config/utils";

interface IScreenFullProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScreenFull({ children, className }: IScreenFullProps) {
  return (
    <section className={cn("w-full bg-[#F4F6F8]", className)}>
      <div className="px-3 sm:px-6 lg:px-24 3xl:px-[18.75rem]">{children}</div>
    </section>
  );
}
