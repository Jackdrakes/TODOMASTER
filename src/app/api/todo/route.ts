
//TODO apiw
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db'; 

export async function GET(req: NextRequest) {
  try {
    // Fetch all todos from the database
    const todos = await prisma.todo.findMany();

    
    return NextResponse.json(todos, { status: 200 }); //todos, 
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}