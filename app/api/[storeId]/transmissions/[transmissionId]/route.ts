import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ transmissionId: string }> }
) {
  try {
    const { transmissionId } = await params;

    if (!transmissionId) {
      return new NextResponse("transmission id is required", { status: 400 });
    }

    const transmission = await db.transmission.findUnique({
      where: {
        id: transmissionId,
      },
    });
    return NextResponse.json(transmission);
  } catch (error) {
    console.log("[TRANSMISSION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; transmissionId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { transmissionId } = await params;
    const body = await req.json();
    const { name} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
  
    if (!transmissionId) {
      return new NextResponse("transmission id is required", { status: 401 });
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

    const transmission = await db.transmission.updateMany({
      where: {
        id: transmissionId,
      },
      data: {
        name,
      
      },
    });
    return NextResponse.json(transmission);
  } catch (error) {
    console.log("[TRANSMISSION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; transmissionId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { transmissionId } = await params;

    if (!transmissionId) {
      return new NextResponse("transmission  id is required", { status: 400 });
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

    const transmission = await db.transmission.deleteMany({
      where: {
        id: transmissionId,
      },
    });
    return NextResponse.json(transmission);
  } catch (error) {
    console.log("[TRANSMISSION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
