import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Credentials are missing");
          }
          const isEmail = credentials.identifier.includes("@");

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
            {
              method: "POST",
              body: JSON.stringify({
                username: isEmail ? "" : credentials.identifier,
                email: isEmail ? credentials.identifier : "",
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(
              data.non_field_errors
                ? data.non_field_errors[0]
                : "Invalid credentials"
            );
          }
          return data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          throw new Error(error.message || "Failed to login");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async session({ session, token }) {
      session.access = token.access as string;
      session.refresh = token.refresh as string;
      session.user.name = token.name ?? "";
      session.user.email = token.email ?? "";
      console.log("PRE SESSION:", session);
      return session;
    },

    async jwt({ token, user }) {
      console.log("JWT Callback - Before:", token, user);

      if (user && user.access) {
        return {
          ...token,
          access: user.access,
          refresh: user.refresh,
          email: user.user?.email ?? null,
          name: user.user?.username ?? user.user?.name ?? null,
          image: user.image ?? null,
          accessTokenExpires: user.accessTokenExpires,
        };
      }
      console.log("JWT Callback - After:", token);
      const tokenExpireAt = token.accessTokenExpires as number;
      if (Date.now() < (tokenExpireAt as number)) {
        return token;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
          {
            method: "POST",
            body: JSON.stringify({ refresh: token.refresh }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();

        return {
          ...token,
          access: data.access,
          accessTokenExpires:
            JSON.parse(
              Buffer.from(data.access.split(".")[1], "base64").toString("utf-8")
            ).exp * 1000,
          refresh: data.refresh || token.refresh,
        };
      } catch (error) {
        console.error("Cannot Refresh Token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
  },
};

export default NextAuth(authOptions);
