import { LibraryBig } from "lucide-react";
import AuthContent from "./authContent";

export default async function Auth(){

  return (
    <div className="w-full flex flex-1">

      {/* BANNER */}
      <div className="hidden lg:flex bg-(--navy) flex-1 w-1/2 min-h-full relative overflow-hidden items-center lg:px-[9%] text-white">

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

          <p className="text-[#a6a19b] text-sm w-80 tracking-wider">
            Connect with a community that shares, learns, and builds the future of technology.
          </p>
        </div>

      </div>

      <AuthContent />
    </div>
  )
}