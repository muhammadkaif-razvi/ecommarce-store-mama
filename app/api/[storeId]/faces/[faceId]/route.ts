import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ faceId: string }> }
) {
  try {
    const {faceId } = await params;

    if (!faceId) {
      return new NextResponse("transmission id is required", { status: 400 });
    }

    const face = await db.face.findUnique({
      where: {
        id: faceId,
      },
    });
    return NextResponse.json(face);
  } catch (error) {
    console.log("[face_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; faceId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { faceId } = await params;
    const body = await req.json();
    const { name} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
  
    if (!faceId) {
      return new NextResponse("face id is required", { status: 401 });
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

    const face = await db.face.updateMany({
      where: {
        id: faceId,
      },
      data: {
        name,
      
      },
    });
    return NextResponse.json(face);
  } catch (error) {
    console.log("[face_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; faceId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { faceId } = await params;

    if (!faceId) {
      return new NextResponse("face  id is required", { status: 400 });
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

    const face = await db.face.deleteMany({
      where: {
        id: faceId,
      },
    });
    return NextResponse.json(face);
  } catch (error) {
    console.log("[faceDELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
