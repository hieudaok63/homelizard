import { api } from "~/utils/api";
import { ErgebnisseItem } from "../../Home/components";

export default function ObjectProfile() {
  const { data } = api.searchResult.list.useQuery({ page: 1, limit: 100 });
  return (
    <div className="mt-24 flex h-full w-full flex-col items-center p-4">
      <div>
        {data?.items.map((item, i) => (
          <ErgebnisseItem key={i} data={item} />
        ))}
      </div>
    </div>
  );
}
