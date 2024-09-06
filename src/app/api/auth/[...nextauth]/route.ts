import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // For password hashing
const prisma = new PrismaClient();


interface User {
  id: string; // Ensure this matches your Prisma User model
  email: string;
  username: string; 
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        // Find user in the database
        const user = await prisma.user.findUnique({
          where: { email }
        });
        // console.log('authorize -', user)
        
        if (user && (await bcrypt.compare(password, user.password)) ) { //user.password === password
          return { id: user.id.toString(), email: user.email, username: user.username } as User;// Ensure the ID is a string if needed
        } else {
          return null; // Return null if authentication fails
        }

      }
    })
  ],
  pages: {
    signIn: '/auth/sign-in', // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // console.log('token Jwt-', user)
        const typedUser = user as User; // Cast user to User type
        token.id = typedUser.id; // Add user ID to token
        token.username = typedUser.username; // Add username to token
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Add user ID to session
      session.user.username = token.username; // Add username to session
      // console.log("session user id -" , session)
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };