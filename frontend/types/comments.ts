import { User } from "./users";

export interface Commment {
  id: string,
  created_at: Date,
  likedBy: User[],
  body: string,
  author: User
}

export interface CommentProfile {
  id: number,
  body: string,
  createdAt: Date,
  likes: number
}