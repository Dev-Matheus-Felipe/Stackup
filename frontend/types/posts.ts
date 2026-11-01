import { ApiResponse } from "./api";
import { Commment } from "./comments";
import { User } from "./users";

export interface Post {
  id: number,
  title: string,
  body: string,
  likes: string,
  createdAt: string,
  code: string,
  user: User,
    
  tags: string[],
  comments: Commment[]
}
