import { getData } from "@/lib/actions/main";
import { Post } from "@/types/posts";

export default async function HomeTopQuestions(){
  const posts = await getData<Post[]>({
    cache: {tag: "topTags", time: "hours"},
    endpoint: "/posts/some?amount=3&offset=0&tops=true", 
  });

  return (
    <div className="flex flex-col text-sm justify-start gap-2 flex-1">
      { posts.data.length == 0

      ? <p className="mt-3">No questions have been asked yet.</p>
      
      : posts.data.map((p, index) => (
        <div 
          className="flex items-start gap-3 border-b-2 border-(--surface-soft) py-1 pb-3 last:border-b-0 hover:text-(--orange) cursor-pointer" 
          key={p.id}
        >
          <h1 className="p-1 px-2 rounded-md text-(--muted) bg-(--surface-soft)">{index + 1}</h1>

          <div className="overflow-hidden pb-1 last:pb-0">
            <h1 className="truncate">{p.title}</h1>
            <p className="text-(--muted) text-xs">{p.likedBy.length} likes</p>
          </div>
        </div>
      ))}
    </div>

  );
}