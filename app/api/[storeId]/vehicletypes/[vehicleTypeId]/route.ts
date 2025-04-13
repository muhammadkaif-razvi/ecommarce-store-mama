import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ vehicleTypeId: string }> }
) {
  try {
    const { vehicleTypeId } = await params;

    if (!vehicleTypeId) {
      return new NextResponse("vehicle type id is required", { status: 400 });
    }

    const vehicletype = await db.vehicleType.findUnique({
      where: {
        id: vehicleTypeId,
      },
    });
    return NextResponse.json(vehicletype);
  } catch (error) {
    console.log("[VEHICLETYPES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; vehicleTypeId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { vehicleTypeId } = await params;
    const body = await req.json();
    const { name} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
  
    if (!vehicleTypeId) {
      return new NextResponse("vehicle type id is required", { status: 401 });
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

    const vehicletype = await db.vehicleType.updateMany({
      where: {
        id: vehicleTypeId,
      },
      data: {
        name,
      
      },
    });
    return NextResponse.json(vehicletype);
  } catch (error) {
    console.log("[VEHICLETYPES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; vehicleTypeId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { vehicleTypeId } = await params;

    if (!vehicleTypeId) {
      return new NextResponse("vehicle type  id is required", { status: 400 });
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

    const vehicletype = await db.vehicleType.deleteMany({
      where: {
        id: vehicleTypeId,
      },
    });
    return NextResponse.json(vehicletype);
  } catch (error) {
    console.log("[VEHICLETYPES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
