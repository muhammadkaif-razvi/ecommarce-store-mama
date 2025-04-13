import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ featureId: string }> }
) {
  try {
    const { featureId } = await params;

    if (!featureId) {
      return new NextResponse("transmission id is required", { status: 400 });
    }

    const feature = await db.features.findUnique({
      where: {
        id: featureId,
      },
    });
    return NextResponse.json(feature);
  } catch (error) {
    console.log("[feature_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; featureId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { featureId } = await params;
    const body = await req.json();
    const { name} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
  
    if (!featureId) {
      return new NextResponse("feature id is required", { status: 401 });
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

    const feature = await db.features.updateMany({
      where: {
        id: featureId,
      },
      data: {
        name,
      
      },
    });
    return NextResponse.json(feature);
  } catch (error) {
    console.log("[feature_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; featureId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { featureId } = await params;

    if (!featureId) {
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

    const feature = await db.features.deleteMany({
      where: {
        id: featureId,
      },
    });
    return NextResponse.json(feature);
  } catch (error) {
    console.log("[feature_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
