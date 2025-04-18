import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ makeupId: string }> }
) {
  try {
    const { makeupId } = await params;

    if (!makeupId) {
      return new NextResponse("transmission id is required", { status: 400 });
    }

    const makeup = await db.makeup.findUnique({
      where: {
        id: makeupId,
      },
    });
    return NextResponse.json(makeup);
  } catch (error) {
    console.log("[makeup_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; makeupId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { makeupId } = await params;
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!makeupId) {
      return new NextResponse("makeup id is required", { status: 401 });
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

    const makeup = await db.makeup.updateMany({
      where: {
        id: makeupId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(makeup);
  } catch (error) {
    console.log("[makeup_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; makeupId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { makeupId } = await params;

    if (!makeupId) {
      return new NextResponse("makeup  id is required", { status: 400 });
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

    const makeup = await db.makeup.deleteMany({
      where: {
        id: makeupId,
      },
    });
    return NextResponse.json(makeup);
  } catch (error) {
    console.log("[makeup_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
