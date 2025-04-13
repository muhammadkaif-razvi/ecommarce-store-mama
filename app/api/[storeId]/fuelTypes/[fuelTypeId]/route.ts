import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ fuelTypeId: string }> }
) {
  try {
    const { fuelTypeId } = await params;

    if (!fuelTypeId) {
      return new NextResponse("FUELTYPE id is required", { status: 400 });
    }

    const fuelType = await db.fuelType.findUnique({
      where: {
        id: fuelTypeId,
      },
    });
    return NextResponse.json(fuelType);
  } catch (error) {
    console.log("[FUELTYPES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; fuelTypeId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { fuelTypeId } = await params;
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
 
    if (!fuelTypeId) {
      return new NextResponse("fuel type id is required", { status: 400 });
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

    const fuelType = await db.fuelType.updateMany({
      where: {
        id: fuelTypeId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(fuelType);
  } catch (error) {
    console.log("[FUELTYPES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; fuelTypeId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { fuelTypeId } = await params;

    if (!fuelTypeId) {
      return new NextResponse("fuel type id is required", { status: 400 });
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

    const fuelType = await db.fuelType.deleteMany({
      where: {
        id: fuelTypeId,
      },
    });
    return NextResponse.json(fuelType);
  } catch (error) {
    console.log("[FUELTYPES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
