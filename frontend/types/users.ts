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