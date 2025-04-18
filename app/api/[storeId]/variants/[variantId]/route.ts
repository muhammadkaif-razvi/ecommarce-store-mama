import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { variantId: string } } 
) {
  try {
    const { variantId } = params;
    if (!variantId) {
      return new NextResponse("variant ID is required", { status: 400 });
    }

    const variant = await db.variant.findUnique({
      where: { id: variantId },
      include: {
        images: true,
      },
    });

    if (!variant) {
      return new NextResponse("variant not found", { status: 404 });
    }

    return NextResponse.json(variant);
  } catch (error) {
    console.error("[variant_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; variantId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { variantId } = await params;
    const body = await req.json();
    const {
      name, images, price, productId, variantsepQuant, inventory
    
    } = body;

    if (!userId) {
      return new NextResponse("Unauthanticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }   if (!variantsepQuant) {
      return new NextResponse("quantity is required", { status: 400 });
    }   if (!inventory) {
      return new NextResponse("inventory is required", { status: 400 });
    }
    
    if (!productId) {
      return new NextResponse("product is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("images  is required", { status: 400 });
    }

    if (!variantId) {
      return new NextResponse("variant id is required", { status: 400 });
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

    await db.variant.update({
      where: {
        id: variantId,
      },
      data: {
        name,
        images: {
          deleteMany: {},
        },
        price,
        productId,
        variantsepQuant,
        inventory,
            
      },
    });
    const variant = await db.variant.update({
      where: {
        id: variantId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(variant);
  } catch (error) {
    console.log("[variantS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; variantId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { variantId } = await params;

    if (!variantId) {
      return new NextResponse("variant id is required", { status: 400 });
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

    const variant = await db.variant.deleteMany({
      where: {
        id: variantId,
      },
    });
    return NextResponse.json(variant);
  } catch (error) {
    console.log("[variantS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
