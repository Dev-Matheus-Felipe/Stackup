import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getData } from "@/lib/actions/main";
import { getTokenData } from "@/lib/token"
import { TagProfile } from "@/types/tags";
import { UserProfile } from "@/types/users";
import { redirect } from "next/navigation";
import { Pencil } from "lucide-react";
import { getUserIconColor } from "@/lib/general";

async function getProfileData({userId} : {userId: string}){
  return await Promise.all([
    getData<UserProfile>({endpoint: "/users/my-profile", cache: {time: "days", tag: `user-${userId}`}}),
    getData<TagProfile>({endpoint: "/tags/my-profile", cache: {time: "days", tag: `user-${userId}`}}),
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

    const { user, topPosts, topComments, totals } = userData.data;
    const { data: tags } = userTags;

    const avatar = !user.avatar.startsWith("https://") ? getUserIconColor({number: user.avatar}) : user.avatar;

    return (
      <div className="w-full h-full lg:p-2 flex flex-col items-center gap-5">

        {/* BANNER */}
        <div className="w-full bg-(--surface) rounded-2xl overflow-hidden flex flex-col border border-(--border) shrink-0 relative">

          <div className={`w-full s:h-35 h-30 flex overflow-hidden opacity-50`}>
            <div className={`${avatar} w-full h-35 flex-1`} />
          </div>

          <div className="s:pr-5 max-s:px-4 py-8 flex justify-between w-full items-center gap-5 max-s:flex-col s:relative">
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
              className={`absolute right-4 top-4 text-sm border s:border-(--border) p-2.5 rounded cursor-pointer hover:border-(--orange) group`}
            >
              <Pencil size={16} className="group-hover:text-(--orange) s:text-(--muted)" />
              </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-[3fr_1fr] grid-cols-1 w-full gap-5">
          <div className="flex flex-col flex-1 gap-5">
            <div className="col-span-1 col-start-1 grid s:grid-cols-4 grid-cols-2 gap-5 flex-wrap">
              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border)">
                <h1 className="font-medium s:text-2xl text-md">4.280</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">reputação</p>
              </div>

              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border)">
                <h1 className="font-medium s:text-2xl text-md">{totals.PostsCount}</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">Posts</p>
              </div>

              
              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border)">
                <h1 className="font-medium s:text-2xl text-md">{totals.CommentsCount}</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">Comments</p>
              </div>

              <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border)">
                <h1 className="font-medium s:text-2xl text-md">{totals.CommentsLikes + totals.PostsLikes}</h1>
                <p className="tracking-wider text-sm text-(--orange-dark)">Likes</p>
              </div>
            </div>

            <div className="col-span-1 col-start-1  gap-5 bg-(--surface) border border-(--border) rounded p-5">
              <div className="flex flex-col gap-1 pb-2">
                <h1 className="text-lg font-semibold">Recent Ativities</h1>
                <p className="text-sm text-(--muted)">Look at some of your last contributions.</p>
              </div>

              <div className="w-full border-t border-(--border) py-2">
                <p className="text-(--orange-dark) tracking-wider text-sm">You don't have any activity yet.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-5">
            <div className="col-span-1 lg:col-start-2 rounded-md row-start-auto w-full bg-(--surface) h-60 border border-(--border) p-5">
              <h1 className="text-lg text-(--orange-dark)">Achievements</h1>
            </div>

            <div className="col-span-1 lg:col-start-2 rounded-md row-start-auto w-full bg-(--surface) h-55 border border-(--border) p-5">
              <h1 className="text-lg text-(--orange-dark)">Your most used tags</h1>
            </div>
          </div>
        </div>
      </div>
    )
}