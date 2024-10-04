//  api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// get all tasks
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
                status: true,
                completed: true,
            }
        });
        
        return NextResponse.json(tasks, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// create tasks
export async function POST(req: NextRequest, ){

    const {taskName, description, priority, categoryid} = await req.json()

    try {

        const task = await prisma.task.create({
            data: {
                taskName,
                description,
                priority,
                categoryId: categoryid,
                // status: 'todo',
            }
        })
        
        return NextResponse.json(task,{status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Failed to add tasks'}, {status: 500})
    }
}

// selected task
export async function PATCH(request: NextRequest, {params}: {params:{categoryid: string}}) {
    const taskid = params.categoryid
    try {      
        const task = await prisma.task.findUnique({
            where:{
                id: taskid,
            },
        })

        if(!task){
            return NextResponse.json({error: "Task not Found"}, {status: 400})
        }

        const selectedtask = await prisma.task.update({
            where: {
                id: taskid,
            },
            data:{
                completed: !task.completed
            }
        })

        return NextResponse.json({status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Failed to update completion status'}, {status:500})
    }
}

// update entire row
export async function PUT(request: NextRequest, {params}: {params: {categoryid:string}}) {
    const taskid = params.categoryid

    const taskData = await  request.json()
    console.log("status", taskData.Status)
    try {
        
        const updateTask = await prisma.task.update({
            where: { id: taskid},
            data:{
                taskName: taskData.taskName,
                description: taskData.description,
                priority: taskData.priority,
                status: taskData.Status,
            }
        })

        return NextResponse.json(updateTask, {status: 200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: ''}, {status: 500})
    }
}

// delete task 
export async function DELETE(request: NextRequest,{params}: {params:{categoryid:string}}) {
    const taskid = params.categoryid

    try {
        await prisma.task.delete({
            where:{
                id: taskid
            }
        })

        return NextResponse.json({message: 'Successfully Deleted task'}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Failed to add tasks'}, {status: 500})
    }
}

