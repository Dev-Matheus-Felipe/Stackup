"use client"

import { getData } from "@/lib/actions/main"
import { TopTag } from "@/types/tags"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight, Search } from "lucide-react"
import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterType = "Most Popular" | "Less Popular" | "Alphabetical Order";

function filterTags(t1: TopTag, t2: TopTag, filter: FilterType): number{
  switch(filter){
    case "Most Popular":
      return t2.total - t1.total;

    case "Less Popular":
      return t1.total - t2.total;

    case "Alphabetical Order":
      return t1.name.localeCompare(t2.name);
  }
}

export default function PageContent(){
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<FilterType>("Most Popular");

    const {data: res, error} = useQuery({
      queryKey: ["tags-page"],
      queryFn: () => getData<TopTag[]>({endpoint: "/tags/tops"})
    });

    const tags = (res?.data ?? [])
      .filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
      .sort((t1, t2) => filterTags(t1, t2, filter));

    return (
      <div className="flex flex-col flex-1 mt-5">
         <div className="flex w-full gap-5 items-center max-es:flex-col">
          <div className="max-w-150 w-full h-11 relative border border-(--border) rounded-md  overflow-hidden">
            <input 
              className="w-full h-full pl-10 pr-5 text-sm outline-0 bg-(--surface-soft)"
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all tags you want here." 
            />
            
            <Search 
              size={15} 
              color="var(--muted)"
              className="absolute top-1/2 left-3 -translate-y-1/2" 
            />
          </div>

          <Select value={filter} onValueChange={(value) => setFilter(value as FilterType)}>

            <SelectTrigger className={"w-37.5 max-es:w-full h-11! border-(--border) bg-(--surface-soft) rounded cursor-pointer"}>
              <SelectValue />
            </SelectTrigger>

            <SelectContent
              alignItemWithTrigger={false}
              side="bottom"
              align="end"
              sideOffset={8}
              className={"ring-(--border) bg-(--surface-soft) rounded-none"}
            >
              <SelectGroup className={""}>
                <SelectItem className={"cursor-pointer py-3 hover:bg-(--surface) rounded-none"} value="Most Popular">Most Popular</SelectItem>
                <SelectItem className={"cursor-pointer py-3 hover:bg-(--surface) rounded-none"} value="Less Popular">Less Popular</SelectItem>
                <SelectItem className={"cursor-pointer py-3 hover:bg-(--surface) rounded-none"} value="Alphabetical Order">Alphabetical Order</SelectItem>
              </SelectGroup>
            </SelectContent>

          </Select>
         </div>

        <div className="flex-1 py-5 gap-5 xl:grid-cols-4 lg:grid-cols-3 grid items-start rounded">
          { tags?.length == 0
            ? <p className="text-sm text-(--muted)">No Tags found.</p>
            : tags.map(({id, name, description, css_bg, css_color, total}) => (
              <div className="flex flex-col gap-4 bg-(--surface) col-span-1 p-6 border border-(--border) rounded-md" key={id}>
                
                <div className="flex gap-4 w-full items-start">
                  <span 
                    className="size-11 justify-center items-center flex rounded font-bold text-2xl" 
                    style={{background: css_bg, color: css_color }}
                  >
                    #
                  </span>
                  <div className="flex flex-col justify-start">
                    <h1 className="text-lg font-medium">{name}</h1>
                    <p className="text-xs text-(--muted)">{total} questions</p>
                  </div>
                </div>

                <p className="text-sm font-extralight text-(--muted) lowercase">{description}</p>

                <span className="w-full h-[0.1px] bg-(--muted) rounded-full" />

                <div className="flex justify-between items-center hover:text-(--orange-dark) text-(--orange) cursor-pointer">
                  <p className=" text-sm">See questions</p>
                  <ArrowRight size={15} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
}