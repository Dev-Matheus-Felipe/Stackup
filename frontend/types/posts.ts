import { UserOverview } from "./users";

export interface PostOverview {
  id: number,
  title: string,
  body: string,
  createdAt: Date,

  user: UserOverview,
  tags: string[],

  likes: number,
  iLiked: boolean,
  commentsCount: number,
}


export interface PostProfile {
  id: number,
  title: string,
  createdAt: Date,
  type: "post",
  responses: number
}