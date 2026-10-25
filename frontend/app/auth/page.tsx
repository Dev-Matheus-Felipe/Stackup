import { LibraryBig } from "lucide-react";
import AuthContent from "./authContent";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

export default function Auth(){

  return (
    <div className="w-full flex min-h-screen">

      {/* BANNER */}
      <div className="hidden lg:flex bg-(--navy) h-ull w-4/7  relative overflow-hidden items-center lg:px-[9%] text-white">

        {/* CARD */}
        <div className="p-5 pr-20 border flex flex-col gap-3 h-min opacity-[0.3] bg-white/10 rounded-2xl -right-10 absolute top-1/8 rotate-6">
          <p><span className="text-(--orange)">const</span> answer = communnity</p>
          
          <div className="flex flex-col pl-9">
            <p>.share()</p>
            <p>.learn()</p>
            <p>.grow()</p>
          </div>
        </div>

        {/* CIRCLE */}
        <div className="absolute -right-50 -bottom-50 w-100 h-100 rounded-full shadow-[0_0_0_70px_#ffffff06,0_0_0_140px_#ffffff05]" />


        {/* DESCRIPTION */}
        <div className="flex flex-col h-full justify-center items-start relative gap-5" >

          {/* ICON */}
          <div className="max-lg:hidden absolute inset-0 top-20">
            <div className="flex gap-2 items-center justify-start">
              <div className="p-2 rounded-md bg-(--orange)"><LibraryBig size={30} /></div>

              <h1 className="font-bold text-3xl">
                Stack
                <span className="text-(--orange-dark)">up</span>
              </h1>
            </div>
          </div>

          <h2 className="font-semibold text-(--orange-dark) text-sm tracking-wider">KNOWLEDGE THAT TRANSFORMS</h2>

          <h1 className="text-5xl max-w-150 leading-12 font-bold">
            Where good questions find 
            <span className="text-(--orange) font-light"> great answers</span>
          </h1>

          <p className="text-[#f7f5f4] text-sm w-80 tracking-wider font-extralight">
            Connect with a community that shares, learns, and builds the future of technology.
          </p>

          <div className="flex items-center mt-3 gap-4">
            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/161830701?s=400&u=51f9b84793e7836b16320ef8772ae13efc336470&v=4" 
                alt="@Dev-Matheus-Felipe" />
                <AvatarFallback>MF</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>

            <div className="flex flex-col">
              <p className="text-xs w-40 font-bold">+ 12,0000 people</p>
              <p className="text-xs w-40 font-bold text-(--muted)">has joined the community</p>
            </div>
          </div>
        </div>

      </div>

      <AuthContent />
    </div>
  )
}