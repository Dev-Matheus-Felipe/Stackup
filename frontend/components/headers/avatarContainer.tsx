"use client"

import { FolderHeart, House, LogOutIcon, MonitorIcon, Moon, MoonIcon, PaletteIcon, Plus, Sun, SunIcon, Tag, Trophy, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AvatarContainer({avatar, userName} : {avatar: string, userName: string}){
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted){
    return null;
  }
  
  const ThemeIcon = theme == "light" ? Moon : Sun;

  return (
    <>

      {/* DESKTOP */}
      <div className="items-center gap-5 md:flex hidden">
        <button 
          className="border border-(--border) h-9.5 w-9.5 flex items-center justify-center rounded-md cursor-pointer hover:border-(--orange-dark) group" 
          onClick={() => setTheme(prev => prev == "dark" ? "light" : "dark")}
        >
          <ThemeIcon size={18} className="group-hover:text-(--orange-dark)" />
        </button>

        <button className="bg-(--orange) text-white h-9.5 px-3 cursor-pointer hover:bg-(--orange-dark) rounded text-sm flex items-center gap-1">
          <Plus size={18} />
          Ask a question
        </button>

        <Link className="rounded-full cursor-pointer" href={"/profile"}>
          <Avatar className={"w-11 h-11 hover:opacity-60"}>
            { avatar.startsWith("https://") &&
               <AvatarImage
                  src={avatar} 
                  alt={userName} 
                  
                />
            }

            <AvatarFallback className={!avatar.startsWith("https://")  ? avatar : ""}>
              {userName.split("-")[0][0]  + (userName.split("-")[1]?.[0] ?? "")}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>

      {/* MOBILE */}
      <div className="md:hidden items-center flex">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className={"es:w-9.5 w-8 es:h-9.5 h-8"}>
                 { avatar.startsWith("https://") &&
                    <AvatarImage
                        src={avatar} 
                        alt={userName} 
                      />
                  }

                  <AvatarFallback className={!avatar.startsWith("https://")  ? avatar : ""}>
                    {userName.split("-")[0][0] + (userName.split("-")[1]?.[0] ?? "")}
                  </AvatarFallback>
                </Avatar>
              </Button>} 
            />

          <DropdownMenuContent className="w-40 mt-2 bg-(--surface) ring-(--border)">

            <DropdownMenuGroup className={"gap-2 flex flex-col"}>
              <DropdownMenuLabel className={"text-(--muted)"}>Navegation</DropdownMenuLabel>

              <DropdownMenuSub>
                <DropdownMenuCheckboxItem>
                  <House />
                  Home
                </DropdownMenuCheckboxItem>

              </DropdownMenuSub>
              
              <DropdownMenuCheckboxItem>
                <FolderHeart />
                Collections
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem>
                <Tag />
                Tags
              </DropdownMenuCheckboxItem>


              <DropdownMenuCheckboxItem>
                <Plus />
                Ask a question
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem>
                <Trophy />
                Ranks
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className={"bg-(--border)"} />

            <DropdownMenuGroup className={"gap-2 flex flex-col"}>
              <DropdownMenuLabel className={"text-(--muted)"}>Preferences</DropdownMenuLabel>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <PaletteIcon />
                  Theme
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent sideOffset={20} className={"ring-(--border) bg-(--surface)"}>
                    <DropdownMenuGroup className={"gap-2 flex flex-col"}>
                      <DropdownMenuLabel className={"text-(--muted)"}>Appearance</DropdownMenuLabel>
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={setTheme}
                      >
                        <DropdownMenuRadioItem value="light">
                          <SunIcon />
                          Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                          <MoonIcon />
                          Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">
                          <MonitorIcon />
                          System
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              
                <Link href={"/profile"}>
                  <DropdownMenuCheckboxItem>
                      <User />
                      Profile
                  </DropdownMenuCheckboxItem>
                </Link>

              <DropdownMenuSeparator className={"bg-(--border)"} />

                <DropdownMenuGroup>
                  <DropdownMenuItem className={"text-red-600"}>
                    <LogOutIcon />
                    Sign Out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuGroup>
            
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </>
  )
}