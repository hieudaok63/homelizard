import Image from "next/image";
import { useRouter } from "next/router";

import { type RouterOutputs } from "@homelizard/api";

import { api } from "~/utils/api";
import { genImageUrl } from "~/utils/helpers";
import { PATH_OBJECT_DETAIL } from "~/constants/navigation";

type FavoriteItem = RouterOutputs["favorite"]["list"]["data"][number];
interface IProps {
  data: FavoriteItem;
}

export default function FavoriteObjectItem(props: IProps) {
  const utils = api.useContext();
  const router = useRouter();
  const { data } = props;

  const { mutate: removeFavoriteById } = api.favorite.removeById.useMutation({
    async onSuccess() {
      await utils.favorite.list.invalidate();
    },
  });
  return (
    <div
      className="relative h-[200px] w-[250px] cursor-pointer rounded-3xl"
      onClick={() =>
        router.push(`${PATH_OBJECT_DETAIL}/${data.searchResult.id}`)
      }
    >
      <Image
        src={genImageUrl(data.searchResult.realEstate.imageUrl)}
        alt={data.searchResult.realEstate.title}
        fill
        className="absolute bottom-0 left-0 right-0 top-0 rounded-3xl"
      />
      <button
        className="absolute right-3 top-3 h-6 w-6 rotate-45 rounded-full bg-red-500 text-white hover:scale-105"
        onClick={() => removeFavoriteById(data.id)}
      >
        +
      </button>
    </div>
  );
}
