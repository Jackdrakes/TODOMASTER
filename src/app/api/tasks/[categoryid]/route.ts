//  api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";


export async function GET(request:NextRequest, {params}: {params: { categoryid: string}} ) {

    const {categoryid} = params
    try {
        
        const tasks = await prisma.task.findMany({
            where: { categoryId: categoryid },
            select: { 
                id: true,
                taskName: true,
                description: true,
                priority: true,
                completed: true,
            }
        });
        
        return NextResponse.json(tasks, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, ){

    const {taskName, description, priority, categoryid} = await req.json()

    try {

        const task = await prisma.task.create({
            data: {
                taskName,
                description,
                priority,
                categoryId: categoryid,
            }
        })
        
        return NextResponse.json({message: 'Successfully Added task'}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Failed to add tasks'}, {status: 500})
    }
}

