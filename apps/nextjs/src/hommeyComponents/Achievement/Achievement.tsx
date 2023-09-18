import Image from "next/image";

import {
  crown,
  crownAchievement,
  cup,
  cupAchievement,
  house,
  houseAchievement,
  smile,
  smileAchievement,
} from "~/assets";

const AchievementList = [
  {
    id: 1,
    icon: crown,
    title: "Premium Property",
    iconBg: crownAchievement,
    vote: "10.5k",
  },
  {
    id: 2,
    icon: smile,
    title: "Happy Customer",
    iconBg: smileAchievement,
    vote: "8600+",
  },
  {
    id: 3,
    icon: cup,
    title: "Awward Winning",
    iconBg: cupAchievement,
    vote: "1200",
  },
  {
    id: 4,
    icon: house,
    title: "Years Experience",
    iconBg: houseAchievement,
    vote: "750",
  },
];

export default function Achievement() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {AchievementList.map((AchievementItem) => (
        <div
          key={AchievementItem.id}
          className="relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md bg-white py-4 shadow-md duration-200 hover:shadow-2xl"
        >
          <Image src={AchievementItem.icon} alt="" className="mb-2" />
          <p className="text-4xl font-bold">{AchievementItem.vote}</p>
          <div className="my-3 h-0.5 w-8 bg-grey_2"></div>
          <p className="text-lg text-grey_4">{AchievementItem.title}</p>
          <Image
            src={AchievementItem.iconBg}
            alt=""
            className="absolute bottom-0 right-0"
          />
        </div>
      ))}
    </div>
  );
}
