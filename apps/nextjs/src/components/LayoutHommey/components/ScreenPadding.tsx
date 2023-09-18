import { cn } from "@homelizard/tailwind-config/utils";

interface IScreenPaddingProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScreenPadding({
  children,
  className,
}: IScreenPaddingProps) {
  return (
    <section
      className={cn("px-3 sm:px-6 lg:px-24 3xl:px-[18.75rem]", className)}
    >
      {children}
    </section>
  );
}
