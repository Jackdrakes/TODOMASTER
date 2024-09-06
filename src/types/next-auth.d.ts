import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add your custom user properties here
      email: string;
      username: string;
      // Add any additional properties you have
    } & DefaultSession["user"];
  }
}