import { Commment } from "./comments";
import { User } from "./users";

export interface Post {
  id: number,
  title: string,
  body: string,
  likedBy: User[],
  createdAt: Date,
  code: string,
  user: User,
    
  tags: string[],
  comments: Commment[]
}

export interface PostOverview extends Post {
  commentsCount: number,
}
