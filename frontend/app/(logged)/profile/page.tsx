import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserIconColor } from "@/lib/general";
import { getTokenData } from "@/lib/token"

export default async function Profile(){
    const data = await getTokenData();

    const avatar = getUserIconColor({number: data.avatar});
    const {username} = data;

    return (
      <div className="w-full h-full lg:p-2 flex flex-col items-center gap-5">

        {/* BANNER */}
        <div className="w-full bg-(--surface) rounded-2xl overflow-hidden flex flex-col border border-(--border) shrink-0">

          <div className={`w-full s:h-35 h-30 flex overflow-hidden opacity-50`}>
            <div className={`${avatar} w-full h-35 flex-1`} />
          </div>

          <div className="s:pr-5 max-s:px-4 py-8 flex justify-between w-full items-center gap-5 max-s:flex-col">
            <div className="flex flex-1 h-full max-s:flex-col max-s:items-center">

              <div className="s:w-30 w-full relative flex justify-center s:mx-2 max-s:mb-10">
                <Avatar className="s:w-24 s:h-24 w-22 h-22  absolute -top-5 -translate-y-1/2 border-5 border-(--surface)">                  
                  { avatar.startsWith("https://") &&
                    <AvatarImage src={avatar} alt={username} />
                  }

                  <AvatarFallback className={!avatar.startsWith("https://")  ? `${avatar} text-2xl font-bold` : ""}>
                    {username.split("-")[0][0]  + (username.split("-")[1]?.[0] ?? "")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-2 max-s:items-center max-s:text-center">
                <h1 className="text-3xl font-bold s:mb-1">{data.username}</h1>
                <p className="text-(--muted) text-sm">asdg asdasd agad asdasdsa da sadadad7sad asdgs a dasid ad a asdu agsdyi aa aa adkady</p>
                <p className="text-(--muted) text-xs">Member since November 2019.</p>
              </div>
            </div>

            <button 
              className={`max-s:hidden text-sm border border-(--border) px-4 py-2.5 rounded cursor-pointer hover:border-(--color)/10`}
            >
              Edit Profile
              </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-[3fr_1fr] grid-cols-1 w-full gap-5">
          <div className="flex flex-col flex-1 gap-5">
            <div className="col-span-1 col-start-1 grid s:grid-cols-4 grid-cols-2 gap-5 flex-wrap">
              { Array.from({length: 4}, (_,i) => (
                <div className="bg-(--surface) col-span-1 s:h-25 h-20 flex px-6 justify-center flex-col rounded border border-(--border)" key={i}>
                  <h1 className="font-medium s:text-2xl text-md">4.280</h1>
                  <p className="text-(--muted) text-sm">reputação</p>
                </div>
              ))}
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
              <h1 className="text-lg">Achievements</h1>
            </div>

            <div className="col-span-1 lg:col-start-2 rounded-md row-start-auto w-full bg-(--surface) h-55 border border-(--border) p-5">
              <h1 className="text-lg">Your most used tags</h1>
            </div>
          </div>
        </div>
      </div>
    )
}