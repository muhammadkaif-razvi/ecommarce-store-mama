import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PUT(
  req: Request,
  { params }: { params: { variantId: string } } 
) {
  try {
    const variantId = params.variantId;
    console.log(`API: PUT /api/cart/items/${variantId}`);

    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      console.warn(`API: PUT /api/cart/items/${variantId} - Unauthorized`);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const quantity = body.quantity as number;


    if (typeof quantity !== "number" || quantity < 0) {
      console.warn(
        `API: PUT /api/cart/items/${variantId} - Invalid quantity`,
        quantity
      );
      return new NextResponse("Invalid quantity", { status: 400 });
    }

    let cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true }, 
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { userId },
        include: { items: true },
      });
    } else {
      console.log(
        `API: PUT /api/cart/items/${variantId} - Found cart`,
        cart.id
      );
    }

    if (quantity === 0) {
      console.log(
        `API: PUT /api/cart/items/${variantId} - Removing item (quantity 0)`
      );
      await db.cartItem.deleteMany({
    
        where: {
          cartId: cart.id,
          variantId: variantId,
        },
      });
    } else {
      console.log(
        `API: PUT /api/cart/items/${variantId} - Upserting item with quantity`,
        quantity
      );
   
      const productId = body.productId as string;

      await db.cartItem.upsert({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId: variantId,
          },
        },
        create: {
          cartId: cart.id,
          variantId: variantId,
          productId: productId,
          quantity: quantity,
        },
        update: { quantity: quantity },
      });
    }

    const updatedCart = await db.cart.findUnique({
      where: { id: cart.id }, 
      include: { items: true }, 
 
    });

    if (!updatedCart) {
      console.error(
        "API: PUT /api/cart/items - Failed to refetch updated cart"
      );
      return new NextResponse("Failed to retrieve updated cart", {
        status: 500,
      });
    }

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("[CART_ITEM_PUT_ERROR]", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
