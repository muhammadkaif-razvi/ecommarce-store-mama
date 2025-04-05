import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthanticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price  is required", { status: 400 });
    }

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


    if (!storeId) {
      return new NextResponse("Store Idis required", { status: 400 });
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

    const product = await db.product.create({
      data: {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images: {
        createMany: {
          data: images.map((image: { url: string }) => image),
        },
      },
      isFeatured,
      isArchived,
      storeId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCTS_POST", error);

    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    const {searchParams} = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") 
    const isArchived = searchParams.get("isArchived") 

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isArchived : isArchived? true : undefined,
        isFeatured : isFeatured? true : undefined
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("PRODUCTS_GET", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
