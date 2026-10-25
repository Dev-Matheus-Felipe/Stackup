import LeftBar from "@/components/headers/leftBar";
import TopBar from "@/components/headers/topBar";
import { ReactNode } from "react";

export default function LoggedLayout({children} : {children: ReactNode}){
  return (
    <div className="w-full min-h-screen grid grid-cols-[1fr_5fr] grid-rows-[auto_1fr]">
      <TopBar />
      
      <LeftBar />

      <div className="md:col-span-1 col-span-2 row-span-1 p-5">
        {children}
      </div>
      
    </div>
  )
}