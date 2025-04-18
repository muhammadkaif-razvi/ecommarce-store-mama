import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ bodyId: string }> }
) {
  try {
    const { bodyId } = await params;

    if (!bodyId) {
      return new NextResponse("body id is required", { status: 400 });
    }

    const body = await db.body.findUnique({
      where: {
        id: bodyId,
      },
    });
    return NextResponse.json(body);
  } catch (error) {
    console.log("[body_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; bodyId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { bodyId } = await params;
    const requestBody = await req.json();
    const { name } = requestBody;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!bodyId) {
      return new NextResponse("body id is required", { status: 401 });
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

    const body = await db.body.updateMany({
      where: {
        id: bodyId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(body);
  } catch (error) {
    console.log("[body_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; bodyId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { bodyId } = await params;

    if (!bodyId) {
      return new NextResponse("body  id is required", { status: 400 });
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

    const body = await db.body.deleteMany({
      where: {
        id: bodyId,
      },
    });
    return NextResponse.json(body);
  } catch (error) {
    console.log("[body_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
