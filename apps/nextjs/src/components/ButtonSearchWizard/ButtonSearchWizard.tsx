import { useRouter } from "next/router";

import { cn } from "@homelizard/tailwind-config/utils";

interface IButtonSearch {
  title: string;
  path: string;
  disabled?: boolean;
}

export default function ButtonSearchWizard({
  title,
  path,
  disabled,
}: IButtonSearch) {
  const router = useRouter();

  return (
    <button
      className={cn(
        "absolute bottom-5 h-12 w-60 rounded-3xl bg-black_2 text-white",
        !disabled
          ? "hover:opacity-90"
          : "cursor-not-allowed bg-slate-600 opacity-60",
      )}
      onClick={() => router.push(path)}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
