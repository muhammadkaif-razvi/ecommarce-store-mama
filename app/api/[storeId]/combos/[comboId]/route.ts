import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ comboId: string }> }
) {
  try {
    const { comboId } = await params;

    if (!comboId) {
      return new NextResponse("combo id is required", { status: 400 });
    }

    const combo = await db.combos.findUnique({
      where: {
        id: comboId,
      },
    });
    return NextResponse.json(combo);
  } catch (error) {
    console.log("[combo_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; comboId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { comboId } = await params;
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!comboId) {
      return new NextResponse("combo id is required", { status: 401 });
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

    const combo = await db.combos.updateMany({
      where: {
        id: comboId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(combo);
  } catch (error) {
    console.log("[combo_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; comboId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { comboId } = await params;

    if (!comboId) {
      return new NextResponse("combo  id is required", { status: 400 });
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

    const combo = await db.combos.deleteMany({
      where: {
        id: comboId,
      },
    });
    return NextResponse.json(combo);
  } catch (error) {
    console.log("[combo_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
