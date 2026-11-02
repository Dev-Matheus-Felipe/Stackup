import { ApiResponse } from "./api";
import { Commment } from "./comments";
import { Tag } from "./tags";
import { User } from "./users";

export interface Post {
  id: number,
  title: string,
  body: string,
  likes: string,
  createdAt: Date,
  code: string,
  user: User,
    
  tags: string[],
  comments: Commment[]
}
