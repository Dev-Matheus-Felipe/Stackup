import HomeBannerLoading from "@/components/loadings/home/banner";
import { getTokenData } from "@/lib/token";
import { Suspense } from "react";
import HomeTopQuestions from "../../components/home/topQuestions";
import { Flame } from "lucide-react";
import TopTags from "../../components/home/topTags";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import PrivateContent from "@/components/home/privateContent";
import HomeTopQuestionsLoading from "@/components/loadings/home/topQuestions";
import HomeTopTagsLoading from "@/components/loadings/home/topTags";

export default function Home() {
  return (
    <div className="w-full h-full flex gap-5 min-w-0">
      <div className="flex-1  flex flex-col es:gap-10 gap-5 min-w-0">

        {/* BANNER */}
        <div 
          className={`w-full bg-(--banner) min-w-0 es:h-50 max-es:py-10 shrink-0 rounded-2xl flex justify-center 
          items-start sm:pl-10 p-5 flex-col relative`}
        >
          
          <Suspense fallback={<HomeBannerLoading/>}>
            <BannerWapper />
          </Suspense>

          {/* DRAWINGS */}
          <div className="absolute max-sm:opacity-40 w-10 h-10 rounded-full bg-purple-900/70 right-9 top-11" />
          <div className="absolute max-sm:opacity-40 w-18 h-18 rounded-full bg-(--orange)/70 bottom-9 right-27" />

          <div 
            className={`text-(--orange) font-bold px-6 py-3 rounded-lg text-lg bg-white/15 
            absolute max-sm:opacity-40 right-13 bottom-20 rotate-6 border border-white/30`}
          >
            {"< / >"}
          </div>
        </div>

        {/* POSTS */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2 pb-0 flex flex-col gap-7 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-lg">Top Questions</h1>
              <p className="text-(--muted) es:text-sm text-xs">Most recent questions asked by the community</p>
            </div>

            <h2 className="bg-(--surface) px-5 py-1.5 rounded border border-(--border) text-(--muted)">Recent</h2>
          </div>

          <PrivateContent  />
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-80 h-full shrink-0 max-xl:hidden flex flex-col gap-5">
        
        {/* TOP QUESTIONS */}
        <div className="bg-(--surface) w-full border border-(--border) rounded-lg h-60 flex flex-col gap-3 px-4 pt-4 pb-2 justify-start">
          <div className="flex items-center gap-3 pl-3">
            <div className="p-1 rounded bg-(--orange)/10 ">
              <Flame size={20} color="var(--orange-dark)"/>
            </div>

            <h2 className="text-md font-semibold">Trending this week</h2>
          </div>
          
          <Suspense fallback={<HomeTopQuestionsLoading />}>
            <HomeTopQuestions />
          </Suspense>
        </div>

        {/* TOP TAGS */}
        <div className="bg-(--surface) w-full border border-(--border) rounded-lg h-75 flex flex-col px-4 pt-5 pb-2 justify-start">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-semibold">Top Tags</h2>
              <p className="text-(--orange-dark) text-sm font-semibold cursor-pointer hover:underline">See all</p>
            </div>

            <Suspense fallback={<HomeTopTagsLoading />}>
              <TopTags />
            </Suspense>
        </div>

        {/* COMMUNITY */}
        <div className="bg-(--soft-blue) w-full rounded-lg h-45 flex flex-col justify-center pl-7 gap-4">
          <div className="flex items-center gap-3">
            <AvatarGroup >
              <Avatar className={"w-7 h-7"}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Avatar className={"w-7 h-7"}>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>

              <Avatar className={"w-7 h-7"}>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>

            <p className="text-xs font-bold">+ 12k</p>
          </div>

          <div className="flex flex-col">
            <h1>Be part of the conversation</h1>
            <p className="text-(--muted) text-xs">thousands of devs sharing and learning every day.</p>
          </div>

          <p className="text-(--orange) text-sm font-medium hover:text-(--orange-dark) cursor-pointer">Explore the community →</p>
        </div>

      </div>
    </div>
  );
}

// MAIN BANNER

async function BannerWapper(){  
  const data = await getTokenData();

  const firstName = data.username.split("-")[0];

  const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  //await new Promise(p => setTimeout(p, 3000));
  
  return (
    <div className="z-10">
      <p className="text-(--orange) sm:pb-3 pb-2 font-bold tracking-wider">A community for those who build.</p>
        
      <h1 className="lg:text-3xl text-2xl font-bold">
        <span className="max-es:hidden">Hello <span className="text-(--orange)">{name}</span>, </span>
        What will we do today?
      </h1>
      <h2 className="lg:text-sm text-xs text-(--color)/10">Find people, get answers, share knowledge, and grow with the community.</h2>
    </div>
  );
}