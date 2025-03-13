import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ BillboardId: string }> }
) {
  try {
    const { BillboardId } = await params;
    if (!BillboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const Billboard = await db.billboard.findUnique({
      where: {
        id: BillboardId,
      },
    });
    return NextResponse.json(Billboard);
  } catch (error) {
    console.log("[GET_BILLBOARD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; BillboardId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { BillboardId } = await params;

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    if (!BillboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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
    const Billboard = await db.billboard.updateMany({
      where: {
        id: BillboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(Billboard);
  } catch (error) {
    console.log("[BILLOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; BillboardId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { BillboardId } = await params;
    const { storeId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!BillboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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

    const Billboard = await db.billboard.deleteMany({
      where: {
        id: BillboardId,
      },
    });
    return NextResponse.json(Billboard);
  } catch (error) {
    console.log("[BILLOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
