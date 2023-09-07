import { useRouter } from "next/router";

import { Button, ChangeLanguage, LayoutLoginRegister } from "~/components";
import { PATH_OBJECTTYPE, PATH_SIGN_IN } from "~/constants/navigation";

export default function IndexPage() {
  const router = useRouter();

  return (
    <LayoutLoginRegister title="Log in & Sign up">
      <div className="flex justify-end">
        <ChangeLanguage />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Button
          className="mb-6 w-[80%] bg-white text-black shadow-4xl hover:bg-bg_home"
          color="white"
          type="submit"
          onClick={() => router.push(PATH_SIGN_IN)}
        >
          Log in
        </Button>

        <Button
          className="w-[80%]"
          color="white"
          type="submit"
          onClick={() => router.push(PATH_OBJECTTYPE)}
        >
          Sign up
        </Button>
      </div>
    </LayoutLoginRegister>
  );
}
