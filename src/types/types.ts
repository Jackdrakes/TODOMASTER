// types.ts
export interface User {
    id: string; 
    email: string;
    username: string; 
}

export interface Session {
    user: User;
    expires: string;
}

export type Priority = 'Low' | 'Medium' | 'High';

export type Status =  "Todo" | "InProgress" | "Done" | "Backlog" | "Canceled";


export interface Category {
    id: string;
    categoryName: string;
    categoryIcon: string; 
}

export interface Task {
    id: string;
    taskName: string;
    title?: string;
    status: "Todo" | "InProgress" | "Done" | "Backlog" | "Canceled";
    description: string;
    priority?: "Low"| "Medium" | "High";
    completed: boolean
    // category: string;
  }