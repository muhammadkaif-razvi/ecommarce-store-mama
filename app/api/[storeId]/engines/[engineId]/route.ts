import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ engineId: string }> }
) {
  try {
    const { engineId } = await params;

    if (!engineId) {
      return new NextResponse("transmission id is required", { status: 400 });
    }

    const engine = await db.engine.findUnique({
      where: {
        id: engineId,
      },
    });
    return NextResponse.json(engine);
  } catch (error) {
    console.log("[engine_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; engineId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { engineId } = await params;
    const body = await req.json();
    const { name} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
  
    if (!engineId) {
      return new NextResponse("engine id is required", { status: 401 });
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

    const engine = await db.engine.updateMany({
      where: {
        id: engineId,
      },
      data: {
        name,
      
      },
    });
    return NextResponse.json(engine);
  } catch (error) {
    console.log("[engine_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; engineId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { engineId } = await params;

    if (!engineId) {
      return new NextResponse("engine  id is required", { status: 400 });
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

    const engine = await db.engine.deleteMany({
      where: {
        id: engineId,
      },
    });
    return NextResponse.json(engine);
  } catch (error) {
    console.log("[engine_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
