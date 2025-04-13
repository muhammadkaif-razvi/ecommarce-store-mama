import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// import { Decimal } from "@prisma/client/runtime/library";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } } // Fixed: Remove Promise wrapper
) {
  try {
    const { productId } = params; // Direct destructuring

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }


    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { productId } = await params;
    const body = await req.json();
    const {
      name,
      price,
      discountPrice,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price  is required", { status: 400 });
    }  
    //   if (!discountPrice) {
    //   return new NextResponse("price  is required", { status: 400 });
    // }

    if (!categoryId) {
      return new NextResponse("category Id  is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("color Id  is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("size Id  is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("images  is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("product id is required", { status: 400 });
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

   await db.product.update({
      where: {
        id: productId,
      },
      data: {
      name,
      price,
      // discountPrice,
      categoryId,

      colorId,
      sizeId,
      images: {
        deleteMany: {},
      },
      isFeatured,
      isArchived,
      },
    });
const product = await db.product.update ({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          },
        },
     
      },
})
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { productId } = await params;

    if (!productId) {
      return new NextResponse("product id is required", { status: 400 });
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

    const product = await db.product.deleteMany({
      where: {
        id: productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
