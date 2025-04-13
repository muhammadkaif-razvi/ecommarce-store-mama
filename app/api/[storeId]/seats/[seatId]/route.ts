import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ seatId: string }> }
) {
  try {
    const { seatId } = await params;

    if (!seatId) {
      return new NextResponse("seat id is required", { status: 400 });
    }

    const seat = await db.seats.findUnique({
      where: {
        id: seatId,
      },
    });
    return NextResponse.json(seat);
  } catch (error) {
    console.log("[seat_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; seatId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { storeId } = await params;
    const { seatId } = await params;
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!seatId) {
      return new NextResponse("seat id is required", { status: 401 });
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

    const seat = await db.seats.updateMany({
      where: {
        id: seatId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(seat);
  } catch (error) {
    console.log("[seat_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; seatId: string }> }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = await params;
    const { seatId } = await params;

    if (!seatId) {
      return new NextResponse("seat  id is required", { status: 400 });
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

    const seat = await db.seats.deleteMany({
      where: {
        id: seatId,
      },
    });
    return NextResponse.json(seat);
  } catch (error) {
    console.log("[seat_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
