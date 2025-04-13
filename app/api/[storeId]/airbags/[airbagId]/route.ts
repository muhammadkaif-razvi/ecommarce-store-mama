import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ airbagId: string }> }
) {
  try {
    const { airbagId } = await params;

    if (!airbagId) {
      return new NextResponse("airbag id is required", { status: 400 });
    }

    const airbag = await db.airbag.findUnique({
      where: {
        id: airbagId,
      },
    });
    return NextResponse.json(airbag);
  } catch (error) {
    console.log("[airbag_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; airbagId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { airbagId } = await params;
    const body = await req.json();
    const { name} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
  
    if (!airbagId) {
      return new NextResponse("airbag id is required", { status: 401 });
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

    const airbag = await db.airbag.updateMany({
      where: {
        id: airbagId,
      },
      data: {
        name,
      
      },
    });
    return NextResponse.json(airbag);
  } catch (error) {
    console.log("[airbag_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; airbagId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { airbagId } = await params;

    if (!airbagId) {
      return new NextResponse("feature  id is required", { status: 400 });
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

    const airbag = await db.airbag.deleteMany({
      where: {
        id: airbagId,
      },
    });
    return NextResponse.json(airbag);
  } catch (error) {
    console.log("[airbag_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
