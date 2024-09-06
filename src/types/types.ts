// types.ts
export interface User {
    id: string; // Ensure this matches your Prisma User model
    email: string;
    username: string; 
}

export interface Session {
    user: User;
    expires: string;
}