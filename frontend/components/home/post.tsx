import { Post } from "@/types/posts";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getGeneralTime, getUserIconColor } from "@/lib/general";
import { RefObject } from "react";

export default function HomePost({post, ref} : {post: Post, ref?: RefObject<HTMLDivElement | null>}){
  const { user } = post;

  const userHasIcon = user.avatar.startsWith("https://");
  const userIcon = userHasIcon ? user.avatar : getUserIconColor({number: user.avatar});
  
  return (
    <div 
      ref={ref}
      className={`w-full p-5 bg-(--surface) rounded border border-transparent 
      hover:border-(--orange-dark) flex flex-col gap-3 cursor-pointer min-w-0`}
    >

      {/* TITLE */}
      <div className="flex items-center justify-between gap-5 min-w-0">
        <h1 className="font-semibold sm:text-lg text-sm truncate min-w-0">{post.title}</h1>
        <Bookmark size={16} className="text-(--muted) hover:text-(--orange) cursor-pointer shrink-0" />
      </div>

      {/* BODY */}
      <p className="text-(--muted) sm:text-sm text-xs">{post.body}</p>
      
      {/* TAGS */}
      <div className="flex items-center gap-4 flex-wrap">
        { post.tags.map((t, index) => (
          <p 
            key={post.id + "-" + t + "-" + index} 
            className="text-xs bg-(--navbar-color)/10 text-(--navbar-color) rounded py-1 px-3 font-medium"
          >
            {t}
          </p>
        ))}
      </div>
      
      {/* LINE */}
      <div className="w-full h-0.5 bg-(--surface-soft)" />
      
      {/* BOTTOM */}
      <div className="flex justify-between items-center gap-4 min-w-0 ">

        {/* LEFT */}
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className={"sm:w-9 sm:h-9 w-7 h-7"}>
            { userHasIcon &&
              <AvatarImage src={userIcon} alt={user.username}  />
            }

            <AvatarFallback className={!userHasIcon  ? userIcon : ""}>
              {user.username.split("-")[0][0]  + (user.username.split("-")[1]?.[0] ?? "")}
            </AvatarFallback>
          </Avatar>

          <h2 className="max-es:text-xs">{user.username}</h2>
          <p className="text-xs text-(--muted) truncate ">
            {getGeneralTime({date: post.createdAt})}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 text-(--muted)">
          <div className="flex items-center gap-1">
            <MessageCircle size={16}  />
            <p className="text-xs">{post.comments?.length ?? 0}</p>
          </div>

          <div className="flex items-center gap-1">
            <Heart size={16}  />
            <p className="text-xs">{post.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}