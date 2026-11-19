"use client"

import { Compass, Flame, FolderHeart, House, LogOut, Tag, Trophy, Users } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner";
import { logoutAction } from "@/lib/actions/main";
import Link from "next/link";

const linksStyle = `flex items-center p-3 pl-4.5 hover:bg-(--navbar-color)/10 hover:text-(--navbar-color) rounded-lg  
gap-4 cursor-pointer duration-100`;

const linkSelected = "text-(--navbar-color) bg-(--navbar-color)/10 font-bold! border-l-1";

export default function LeftBar(){
  const pathname = usePathname();
  const router = useRouter();

  const url = pathname;

  async function logout(){
    await logoutAction();

    toast.success("logged out successfully");
    router.refresh();
  }

  return (
    <div 
      className={`col-span-1 lg:w-60 w-55 row-span-1 bg-(--surface) border-r border-(--border) max-md:hidden px-4 pt-8 pb-5
      flex flex-col justify-between`}
    >

      {/* MAIN */}
      <div className="flex flex-col gap-10 flex-1">
        <div className="flex flex-col gap-2 text-(--muted) text-sm">
          <h2 className="text-xs mt-3 uppercase font-bold ml-5 mb-1">Menu</h2>
          
          <Link href={"/"} className={`${linksStyle} ${url == "/"  && linkSelected}`}>
            <House size={18} />
            <h2>Home</h2>
          </Link>
          
          <Link href={"/"} className={`${linksStyle}  ${url == "explore" && linkSelected}`}>
            <Compass size={18} />
            <h2>Explore</h2>
          </Link>

          <Link href={"/tags"} className={`${linksStyle} ${url.startsWith("/tags") && linkSelected}`}>
            <Tag size={18} />
            <h2>Tags</h2>
          </Link>

          <Link href={"/"} className={`${linksStyle} ${url == "favorites" && linkSelected}`}>
            <FolderHeart size={18} />
            <h2>Collections</h2>
          </Link>

          <Link href={"/"} className={`${linksStyle} ${url == "profile" && linkSelected}`}>
            <Users size={18} />
            <h2>Community</h2>
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-(--muted) text-sm">
          <h2 className="text-xs mt-3 uppercase font-bold ml-5 mb-1">Ranks</h2>
          
          <Link href={"/"} className={`${linksStyle} ${url == "topusers" && linkSelected}`}>
            <Trophy size={18} />
            <h2>Top User</h2>
          </Link>

          <div className={`${linksStyle}  ${url == "explore" && linkSelected}`}>
            <Flame size={18} />
            <h2>Best Posts</h2>
          </div>
        </div>

      </div>


      <button 
        onClick={logout}
        className={`flex items-center pl-4 gap-4 text-(--muted) cursor-pointer w-full py-2.5 rounded-lg transition
        border-l-2 border-transparent hover:border-(--navbar-color)  hover:bg-(--navbar-color)/10 hover:text-(--navbar-color)`}
      >
        <LogOut size={18} />
        Log out
      </button>
    </div>
  )
}