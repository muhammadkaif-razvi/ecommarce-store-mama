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
    const requestBody = await req.json();
    const { name } = requestBody;

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

    const createdBody = await db.body.create({
      data: {
        name,

        storeId,
      },
    });

    return NextResponse.json(createdBody);
  } catch (error) {
    console.log("features_POST", error);

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

    const body = await db.body.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(body);
  } catch (error) {
    console.log("body_GET", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
