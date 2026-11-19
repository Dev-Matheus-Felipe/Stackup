import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getData } from "@/lib/actions/main";
import { getTokenData } from "@/lib/token"
import { TagProfile } from "@/types/tags";
import { UserProfile } from "@/types/users";
import { redirect } from "next/navigation";
import { ChevronRight, Heart, MessageCircle, Pencil, SquareText, Star, Tag } from "lucide-react";
import { getUserIconColor } from "@/lib/general";
import { PostProfile } from "@/types/posts";
import { CommentProfile } from "@/types/comments";
import { getTime } from "date-fns";

async function getProfileData({userId} : {userId: string}){
  return await Promise.all([
    getData<UserProfile>({endpoint: "/users/my-profile", cache: {time: "days", tag: `user-${userId}`}}),
    getData<TagProfile[]>({endpoint: "/tags/my-profile", cache: {time: "days", tag: `user-${userId}`}}),
  ]);
}

export default async function Profile(){
    const {sub} = await getTokenData();
    if(!sub) redirect("/auth");

    const [userData, userTags] = await getProfileData({userId: sub});
    
    if(!userData.success || !userTags.success){
      return (
        <>
          <h1>Something went wrong!</h1>
          <p>Please try again later.</p>
        </>
      );
    }

    const { user, topPosts, topComments, totals, reputation } = userData.data;
    const { data: tags } = userTags;

    const publications: (PostProfile | CommentProfile)[]  = [...topComments, ...topPosts]
      .sort((a, b) => getTime(a.createdAt) - getTime(b.createdAt ))
      .slice(0,4);

    const avatar = !user.avatar.startsWith("https://") ? getUserIconColor({number: user.avatar}) : user.avatar;

    return (
      <div className="w-full h-full lg:p-2 flex flex-col items-center gap-5">

        {/* BANNER */}
        <div className="w-full bg-(--surface) rounded-2xl overflow-hidden flex flex-col border border-(--border) shrink-0 relative">

          <div className={`w-full h-25 flex overflow-hidden opacity-50`}>
            <div className={`${avatar} w-full h-35 flex-1`} />
          </div>

          <div className="s:pr-5 max-s:px-4 py-5 flex justify-between w-full items-center gap-5 max-s:flex-col s:relative">
            <div className="flex flex-1 h-full max-s:flex-col max-s:items-center">

              <div className="s:w-30 w-full relative flex justify-center s:mx-2 max-s:mb-10">
                <Avatar className="s:w-24 s:h-24 w-22 h-22  absolute -top-5 -translate-y-1/2 border-5 border-(--surface)">                  
                  { avatar.startsWith("https://") &&
                    <AvatarImage src={user.avatar} alt={user.username} />
                  }

                  <AvatarFallback className={!avatar.startsWith("https://")  ? `${avatar} text-2xl font-bold` : ""}>
                    {user.username.split("-")[0][0]  + (user.username.split("-")[1]?.[0] ?? "")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-2 max-s:items-center max-s:text-center">
                <h1 className="text-3xl font-bold s:mb-1">{user.username}</h1>
                <p className="text-(--muted) text-sm">{user.bio}</p>
                <p className="text-(--muted) text-xs">Member since November 2019.</p>
              </div>
            </div>

            <button 
              className={`absolute right-4 top-4 text-sm border s:border-(--border) p-2 rounded cursor-pointer hover:border-(--orange) group`}
            >
              <Pencil size={16} className="group-hover:text-(--orange) s:text-(--muted)" />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-[3.5fr_1fr] grid-cols-1 w-full gap-5 overflow-hidden">
          <div className="flex flex-col flex-1 gap-5 overflow-auto">
            <div className="col-span-1 col-start-1 grid s:grid-cols-4 grid-cols-2 gap-5 flex-wrap">
              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border) relative">
                <h1 className="font-bold s:text-2xl text-md">{reputation}</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">reputação</p>
                <Star size={16} color="yellow" className="absolute right-2 top-2" />
              </div>

              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border) relative">
                <h1 className="font-bold s:text-2xl text-md">{totals.PostsCount}</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">Posts</p>
                <SquareText size={16} color="var(--muted)" className="absolute right-2 top-2" />
              </div>

              
              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border) relative">
                <h1 className="font-bold s:text-2xl text-md">{totals.CommentsCount}</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">Comments</p>
                 <MessageCircle size={16} color="var(--opposite)" className="absolute right-2 top-2" />
              </div>

              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border) relative">
                <h1 className="font-bold s:text-2xl text-md">{totals.CommentsLikes + totals.PostsLikes}</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">Likes</p>
                <Heart size={16} color="red" className="absolute right-2 top-2" />
              </div>
            </div>

            <div className="col-span-1 col-start-1  gap-5 bg-(--surface) rounded p-5 border border-(--border) overflow-auto">
              <div className="flex flex-col gap-1 pb-2">
                <h1 className="text-lg font-semibold">Recent Ativities</h1>
                <p className="text-sm text-(--muted)">Look at some of your last contributions.</p>
              </div>
              
              {/* PUBLICATIONS */}
              <div className="w-full flex flex-col">
                { publications.length == 0 
                  ? <p className="text-(--orange-dark) tracking-wider text-sm">You don't have any activity yet.</p>
                   
                  : publications.map((p, index) => {

                    const data = {
                      title: p.type == "post" ? p.title : p.body,

                      banner: p.type == "post" ? "Question" : "Response",
                      bannerStyle: p.type == "post" ? "bg-(--orange)/10 text-(--orange-dark)" : "bg-(--surface-soft) text-green-700",

                      info: p.type == "post" ? `${p.responses} responses` : `${p.likes} likes`,
                    }               

                    return (
                      <div className=" border-t border-(--border) py-4 gap-3 flex items-center justify-between overflow-hidden"  key={index}>
                        <div className="flex items-center gap-4  min-w-0">
                          <p className={`${data.bannerStyle} w-20 py-2 shrink-0 max-es:hidden text-center rounded text-sm`}>
                            {data.banner}
                          </p>

                          <div className="flex flex-1 flex-col  min-w-0">
                            <h1 className="font-bold text-sm">{data.title}</h1>
                            <p className="text-sm text-(--muted) max-es:text-xs ">{data.info}</p>
                          </div>
                        </div>

                        <ChevronRight className="w-5.5 min-w-5.5 text-(--muted) hover:text-(--color) cursor-pointer" />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="flex flex-col flex-1 gap-5 col-span-1">
            <div className="col-span-1 lg:col-start-2 rounded-md row-start-auto w-full bg-(--surface) h-60 border border-(--border) p-5">
              <h1 className="text-lg font-bold">Achievements</h1>
            </div>

            <div className="col-span-1 lg:col-start-2 rounded-md row-start-auto flex flex-col gap-5 w-full bg-(--surface) max-h-55 border border-(--border) p-5">
              <div className="flex w-full gap-3 items-center">
                <Tag size={16} color="var(--muted)" />
                <h1 className="text-md font-bold">Your most used tags</h1>
              </div>

              <div className="flex-1 flex flex-col justify-around gap-5">
                { tags.length == 0 
                  ? <p className="text-sm text-(--muted) flex-1">You haven't posted any posts yet.</p>
                  : tags.slice(0,3).map(t => (
                    <div className="w-full flex justify-between text-sm items-center gap-5" key={t.id}>
                      <p className="bg-(--orange)/10 text-(--orange-dark) px-3.5 py-1 rounded">{t.name}</p>
                      <p className="bg-(--flex-line) flex-1 h-0.5 rounded-full" />
                      <p className="text-(--muted)">{t.count}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}