import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ hairId: string }> }
) {
  try {
    const { hairId } = await params;

    if (!hairId) {
      return new NextResponse("hair id is required", { status: 400 });
    }

    const hair = await db.hair.findUnique({
      where: {
        id: hairId,
      },
    });
    return NextResponse.json(hair);
  } catch (error) {
    console.log("[hair_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; hairId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { hairId } = await params;
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!hairId) {
      return new NextResponse("hair id is required", { status: 401 });
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

    const hair = await db.hair.updateMany({
      where: {
        id: hairId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(hair);
  } catch (error) {
    console.log("[hair_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; hairId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { hairId } = await params;

    if (!hairId) {
      return new NextResponse("hair  id is required", { status: 400 });
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

    const hair = await db.hair.deleteMany({
      where: {
        id: hairId,
      },
    });
    return NextResponse.json(hair);
  } catch (error) {
    console.log("[hair_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
