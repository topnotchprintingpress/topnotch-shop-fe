// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    access?: string; // Extend session with accessToken
    idToken?: string;
    refresh?: string;
    error?: "RefreshAccessTokenError" | "InvalidTokenError" | string;
    accessTokenExpires;

    // Extend session
    user: {
      id: string;
      email: string;
      name: string;
      username: string;
      access: string;
      refresh: string;
      image: string;
    };
    name?: string;
    username?: string;
    email?: string;
  }

  interface JWT {
    access_token?: string;
    error?: "RefreshAccessTokenError" | string;
    accessTokenExpires?: number;
    iat: number;
    exp: number;
  }

  interface User {
    access?: string;
    refresh?: string;
    accessTokenExpires?: number;
    id: string;
    email: string;
    name: string;
    username: string;
    access: string;
    refresh: string;
    image: string;
    user: {
      id: string;
      email: string;
      name: string;
      username: string;
      access: string;
      refresh: string;
      image: string;
    };
  }
}

export interface AuthenticatedUser extends User {
  access?: string;
  refresh?: string;
}
