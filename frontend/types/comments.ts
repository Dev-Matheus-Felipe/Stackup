import { User } from "./users";

export interface Commment {
  id: string,
  created_at: Date,
  likedBy: User[],
  body: string,
  author: User
}