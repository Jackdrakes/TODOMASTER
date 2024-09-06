import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password, username } = await request.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    // Define default categories to create for the user
    const defaultCategories = [
      { categoryName: "My Day", userId: user.id, categoryIcon: "CheckSquare" },
      { categoryName: "To-Do", userId: user.id, categoryIcon: "ListTodo"  },
      { categoryName: "Groceries", userId: user.id, categoryIcon: "ShoppingCart"  },
      { categoryName: "Travel", userId: user.id, categoryIcon: "Plane"  },
      { categoryName: "Movies to Watch", userId: user.id, categoryIcon: "Film"  },
      { categoryName: "Home", userId: user.id, categoryIcon: "Home"  },
      { categoryName: "Work", userId: user.id, categoryIcon: "Briefcase"  },
    ]

    // Create default categories
    const categories = await prisma.category.createMany({
      data: defaultCategories,
    });

    // Return a success response
    // console.log(user)
    return NextResponse.json({ user, categories }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}