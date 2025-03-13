import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: Promise<{ storeId: string }>) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL  is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store Idis required", { status: 400 });
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

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARDS_POST", error);

    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function GET(_req: Request,  params: Promise<{ storeId: string }>) {
  try {
    const { storeId } = await params;

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const billboards = await db.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("BILLBOARDS_GET", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
