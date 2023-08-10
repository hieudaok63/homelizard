"use client";

import Image from "next/image";

import BackgroundImage from "~/assets/images/BackgroundRegister.jpg";

interface ILayout {
  children?: React.ReactNode;
  title?: string;
}

export const LayoutLoginRegister = ({ title, children }: ILayout) => {
  return (
    <main className="flex h-screen flex-col items-center bg-slate-200 pb-12 text-black">
      <div className="flex w-full flex-col items-center justify-center ">
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="font-extrabold sm:text-[5rem] 2xl:text-5xl">
            {title}
          </h1>
          <div className="3xl:w-[80%] flex h-[500px] w-[70%] rounded-lg bg-slate-100 shadow-4xl">
            <div className="register-image h-full flex-1">
              <Image
                src={BackgroundImage}
                className="h-full w-full rounded-lg object-cover py-3 pl-3"
                alt="Register"
              />
            </div>
            <div className="flex-1  p-3">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};
