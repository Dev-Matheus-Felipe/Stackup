"use client"

import { getData } from "@/lib/actions/main"
import { Tag } from "@/types/tags"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"

export default function PageContent(){
    const {data, error} = useQuery({
      queryKey: ["tags-page"],
      queryFn: () => getData<Tag[]>({endpoint: "/tags/tops"})
    });

    console.log(data);

    return (
      <div className="flex flex-col flex-1 mt-5">
         <div className="max-w-150 w-full es:h-11 h-9 relative border border-(--border) rounded-md  overflow-hidden">
          <input 
            className="w-full h-full pl-10 pr-5 text-sm outline-0 bg-(--surface-soft)"
            type="text" 
            placeholder="Search all tags you want here." 
          />
          
          <Search 
            size={15} 
            color="var(--muted)"
            className="absolute top-1/2 left-3 -translate-y-1/2" 
          />
        </div>
      </div>
    )
}