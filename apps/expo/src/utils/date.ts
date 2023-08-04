import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const getTimePost = (time: Date) => {
  return dayjs(time).fromNow();
};
