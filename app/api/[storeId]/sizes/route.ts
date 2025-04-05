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

    const size = await db.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZES_POST", error);

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

    const sizes = await db.size.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("SIZES_GET", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
