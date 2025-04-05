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
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthanticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    const color = await db.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_POST", error);

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
      return new NextResponse("store Id is required", { status: 400 });
    }

    const colors = await db.color.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("COLOR_GET", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
