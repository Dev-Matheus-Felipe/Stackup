import HomeBannerLoading from "@/components/loadings/home/banner";
import { getPartialData } from "@/lib/actions/main";
import { getTokenData } from "@/lib/token";
import { Suspense } from "react";


export default function Home() {
  return (
    <div className="w-full h-full flex gap-5">
      <div className="flex-1  flex flex-col es:gap-10 gap-5">

        {/* BANNER */}
        <div className="w-full bg-(--banner) h-50 shrink-0 rounded-2xl flex justify-center items-start sm:pl-10 p-5 flex-col relative">
          
          <Suspense fallback={<HomeBannerLoading/>}>
            <BannerWapper />
          </Suspense>

          {/* DRAWINGS */}
          <div className="absolute w-10 h-10 rounded-full bg-purple-900/70 right-9 top-11" />
          <div className="absolute w-18 h-18 rounded-full bg-(--orange)/70 bottom-9 right-27" />

          <div className="text-(--orange) px-8 py-3 rounded bg-white/15 absolute right-13 bottom-20 rotate-6 border border-white/30">
            {"</>"}
          </div>
        </div>

        {/* POSTS */}
        <Suspense fallback={<p>LOADING</p>}>
          <PrivateContent />
        </Suspense>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-80 h-full shrink-0 max-xl:hidden flex flex-col gap-5">
        <div className="bg-(--surface) w-full border border-(--border) rounded-lg h-60" />
        <div className="bg-(--surface) w-full border border-(--border) rounded-lg h-70" />
        <div className="bg-(--surface) w-full border border-(--border) rounded-lg h-50" />
      </div>
    </div>
  );
}

async function BannerWapper(){
  const data = await getTokenData();

  const firstName = data.username.split("-")[0];

  const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  //await new Promise(p => setTimeout(p, 3000));
  
  return (
    <div className="z-10">
      <p className="text-(--orange) sm:pb-3 pb-2 font-bold tracking-wider">A community for those who build.</p>
        
      <h1 className="lg:text-3xl text-lg font-bold">Hello <span className="text-(--orange)">{name}</span>, What will we do today?</h1>
      <h2 className="lg:text-sm text-xs text-(--color)/10">Find people, get answers, share knowledge, and grow with the community.</h2>
    </div>
  );
}


async function PrivateContent(){

  const [posts] = await Promise.all([
    getPartialData("/posts/home?amount=10"),
  ]);


  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-2">
      <h1 className="text-lg">Top Questions</h1>

    </div>
  );
}