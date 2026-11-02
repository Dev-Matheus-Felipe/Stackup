import LeftBar from "@/components/headers/leftBar";
import TopBar from "@/components/headers/topBar";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ReactNode } from "react";

export default function LoggedLayout({children} : {children: ReactNode}){
  return (
    <div className="w-full md:h-screen grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <TopBar />
      <LeftBar />

      <div className="md:col-span-1 col-span-2 row-span-1 p-5 overflow-y-auto">
        <QueryProvider>
          {children}
        </QueryProvider>
      </div>
    </div>
  )
}