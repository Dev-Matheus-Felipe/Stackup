import { User } from "./users";

export interface Commment {
  id: string,
  created_at: Date,
  likes: number,
  body: string,
  author: User
}