import { CommentProfile } from "./comments"
import { PostProfile } from "./posts"

export interface User {
  id: string,
  username: string,
  email: string,
  portfolio_url: string,
  bio: string,
  createdAt: Date,
  avatar: string
}

export interface UserOverview {
  id: string,
  username: string,
  avatar: string
}


export interface ProfileMainInfo {
  PostsCount: number,
  CommentsCount: number,

  PostsLikes: number,
  CommentsLikes: number
}

export interface UserProfile extends ProfileMainInfo {
  user: User,
  topPosts: PostProfile[],
  topComments: CommentProfile[],

  totals: ProfileMainInfo
}