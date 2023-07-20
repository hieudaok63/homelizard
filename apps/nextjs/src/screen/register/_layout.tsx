import React from "react";
import Image from "next/image";

import { RegisterBackground } from "~/assets";

interface ILayout {
  children?: React.ReactNode;
  title?: string;
}

export const Layout = ({ title, children }: ILayout) => {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-r from-[#74ebd5] to-[#9face6] pb-10 text-white">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="font-extrabold tracking-tight sm:text-[5rem] 2xl:text-5xl">
            {title}
          </h1>
          <div className="flex max-w-[60%] rounded-lg bg-slate-100 px-6 py-6 3xl:max-w-[60%]">
            <div className="register-image flex-1">
              <Image
                src={RegisterBackground}
                className="h-full w-full object-cover 3xl:w-[350px]"
                alt={"Register"}
              />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};
