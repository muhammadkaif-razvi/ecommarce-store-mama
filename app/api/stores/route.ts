import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const newStore = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(newStore);
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
  
};