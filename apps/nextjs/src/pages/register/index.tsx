import Image from "next/image";
import { useRouter } from "next/router";

import Homelizard from "~/assets/homelizard.svg";
import FirstLogo from "~/assets/images/FirstLogo.jpg";

export default function Register() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <div className="flex h-full w-full rounded-lg">
        <div className="h-full w-2/4">
          <Image
            src={FirstLogo}
            alt=""
            className="h-full w-full bg-cover bg-no-repeat"
          />
          {/* <Homelizard /> */}
        </div>
        <div className=" flex w-2/4 flex-col justify-center bg-[#eaebec] p-2 sm:p-2 lg:p-6 ">
          <p className="text-center text-2xl font-semibold text-gray-500">
            Wir finden deine Immobilie
          </p>
          <div className="flex flex-col p-0 lg:p-6">
            <button
              className="mb-11 mt-10 h-12 rounded-full bg-white  hover:opacity-95"
              onClick={() => router.push({ pathname: "sign-in" })}
            >
              Log in
            </button>
            <button className="h-12 rounded-full bg-[#262636] text-white hover:opacity-95">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
