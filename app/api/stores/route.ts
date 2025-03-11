
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;


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
  } catch{
    return new NextResponse("Database Error", { status: 500 });
  }
  
};