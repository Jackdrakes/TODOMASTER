import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; 
import prisma from "@/lib/db";

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

        const user = await prisma.user.findUnique({
          where: { email }
        });
        
        if (user && (await bcrypt.compare(password, user.password)) ) { 
          return { id: user.id.toString(), email: user.email, username: user.username } as User;
        } else {
          return null; 
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
        const typedUser = user as User; 
        token.id = typedUser.id; 
        token.username = typedUser.username; 
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; 
      session.user.username = token.username; 
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };