import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthanticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const seats = await db.seats.create({
      data: {
        name,

        storeId,
      },
    });

    return NextResponse.json(seats);
  } catch (error) {
    console.log("seats_POST", error);

    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const seats = await db.seats.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(seats);
  } catch (error) {
    console.log("seats_GET", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
