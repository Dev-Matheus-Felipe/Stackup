import { getPartialData } from "@/lib/actions/main";
import { TopTag } from "@/types/tags";

export default async function TopTags(){
  const topTags = await getPartialData<TopTag[]>("/tags/tops?amount=5");

  return (
    <div className="flex-1 flex flex-col gap-2 justify-around mt-2">
      { topTags.data.length == 0
      ? <p className="flex-1 flex items-start mt-3 text-sm">None tag has been created so far.</p>

      : topTags.data.map(t => (
        <div className="flex w-full justify-between items-center group cursor-pointer" key={t.id}>
          <div className="flex items-center gap-4">
              <span className="w-7 h-7 flex items-center justify-center rounded bg-(--orange-soft) text-(--orange-dark) font-bold">#</span>
              <p className="text-sm group-hover:text-(--orange)">{t.name}</p>
          </div>

          <span className="text-(--muted) text-sm">{t.total}</span>
        </div>
      )) }
    </div>
  );
}