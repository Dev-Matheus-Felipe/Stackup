import { LibraryBig, Search} from "lucide-react"
import AvatarContainer from "./avatarContainer";

export default function TopBar(){
  
  return (
    <div 
      className={`col-span-2 row-span-1 h-18 bg-(--surface) flex justify-between items-center es:gap-10 gap-3 md:px-8 
      px-4 py-2 border border-(--border)`}
    >

      {/* LEFT SIDE */}
      <div className="flex items-center lg:gap-15 gap-3 flex-1">

        <div className="flex gap-2 items-center justify-start">

          <div className="max-es:hidden p-2 rounded-md bg-(--orange)">
            <LibraryBig size={18} />
          </div>

          <h1 className="font-bold es:text-2xl text-lg">
            Stack
            <span className="text-(--orange-dark)">up</span>
          </h1>

        </div>

        <div className="max-w-150 w-full h-9.5 relative border border-(--border) rounded-lg  overflow-hidden">
          <input 
            className="w-full h-full pl-11 pr-5 text-xs outline-0 bg-(--surface-soft)"
            type="text" 
            placeholder="Search questions, tags and more..." 
          />
          <Search 
            size={18} 
            color="var(--muted)"
            className="absolute top-1/2 left-3 -translate-y-1/2" 
          />
        </div>
      </div>


      {/* RIGHT SIDE */}
      <AvatarContainer />
    </div>
  );
}