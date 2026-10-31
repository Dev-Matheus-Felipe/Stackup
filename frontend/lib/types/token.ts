import { JwtPayload } from "jwt-decode";

export interface MyToken extends JwtPayload {
  avatar: string;
  username: string;
}