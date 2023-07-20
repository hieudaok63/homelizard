import CreateNewSearch from "~/assets/icons/CreateNewSearch";
import Favorite from "~/assets/icons/Favorite";
import Setting from "~/assets/icons/Setting";
import Tell from "~/assets/icons/Tell";
import { PATH_OBJECTTYPE } from "./navigation";

interface ISideBarProps {
  id: number;
  title: string;
  path: string;
  icon?: JSX.Element;
}

export const sidebarLink: ISideBarProps[] = [
  {
    id: 1,
    title: "Favorites",
    path: "/",
    icon: <Favorite />,
  },
  {
    id: 2,
    title: "Tell-a-friend",
    path: "",
    icon: <Tell />,
  },
  {
    id: 3,
    title: "Create new search",
    path: PATH_OBJECTTYPE,
    icon: <CreateNewSearch />,
  },
  {
    id: 4,
    title: "Settings",
    path: "",
    icon: <Setting />,
  },
];
