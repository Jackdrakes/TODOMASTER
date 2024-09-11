//  api/categories/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";


export async function GET(request: Request) {
    try {
        // Extract the session token or user ID from headers or cookies
        const { headers } = request;
        const sessionToken = headers.get('Authorization');

        if (!sessionToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // console.log("requst api route", request.headers.get('Authorization'))
        // Simulate user ID extraction from token
        const userId = sessionToken 

        if (!userId) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Fetch categories for the user from the database
        const categories = await prisma.category.findMany({
            where: { userId: userId },
            select: { 
                id: true,
                categoryName: true,
                categoryIcon: true,
            }
        });

        return NextResponse.json({ categories }, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}