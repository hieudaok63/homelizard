import { useState } from "react";
import Image from "next/image";

export default function FavoriteObjectItem() {
  const [chooseFavorite, setChooseFavorite] = useState<boolean>(true);
  return (
    <div className="relative h-[200px] w-[250px] cursor-pointer rounded-3xl bg-black">
      <Image
        src="https://anlocgroup.com/wp-content/uploads/2020/03/nha-cap-4-3-phong-ngu-1.jpg"
        alt="obj-img"
        fill
        className="absolute bottom-0 left-0 right-0 top-0 rounded-3xl"
      />
      {chooseFavorite && <div className="absolute left-[50%] top-[50%]"></div>}
    </div>
  );
}
