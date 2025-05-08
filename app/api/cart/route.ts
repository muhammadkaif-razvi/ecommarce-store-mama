import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/cart
export async function GET() {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [] }); // Return an empty cart if not found
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("[CART_GET_ERROR]", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}

// DELETE /api/cart
export async function DELETE() {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const cart = await db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    await db.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    await db.cart.delete({
      where: {
        id: cart.id,
      },
    });

    return NextResponse.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("[CART_DELETE_ERROR]", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}

// POST /api/cart (This function was already provided in the initial code)
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { items } = await req.json(); // Ensure you are parsing the request body correctly

    // 1. Get or create user's cart
    let cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    // 2. Process cart items
    const operations = items.map((item: { variantId: string; productId: string; quantity: number }) =>
      db.cartItem.upsert({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId: item.variantId,
          },
        },
        create: {
          cartId: cart.id,
          variantId: item.variantId,
          productId: item.productId,
          quantity: item.quantity,
        },
        update: { quantity: item.quantity },
      })
    );

    await db.$transaction(operations);

    // 3. Remove items not in the request
    await db.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        variantId: {
          notIn: items.map((i: { variantId: string }) => i.variantId),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CART_POST_ERROR]", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}