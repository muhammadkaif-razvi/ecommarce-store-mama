import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ priceId: string }> }
) {
  try {
    const { priceId } = await params;

    if (!priceId) {
      return new NextResponse("transmission id is required", { status: 400 });
    }

    const price = await db.price.findUnique({
      where: {
        id: priceId,
      },
    });
    return NextResponse.json(price);
  } catch (error) {
    console.log("[price_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; priceId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { priceId } = await params;
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!priceId) {
      return new NextResponse("price id is required", { status: 401 });
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

    const price = await db.price.updateMany({
      where: {
        id: priceId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(price);
  } catch (error) {
    console.log("[price_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; priceId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { priceId } = await params;

    if (!priceId) {
      return new NextResponse("price  id is required", { status: 400 });
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

    const price = await db.price.deleteMany({
      where: {
        id: priceId,
      },
    });
    return NextResponse.json(price);
  } catch (error) {
    console.log("[priceDELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
