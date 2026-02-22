import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// GET single vehicle
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        bookings: {
          where: {
            status: {
              in: ["CONFIRMED", "PENDING"],
            },
          },
          select: {
            startDate: true,
            endDate: true,
            status: true,
          },
        },
      },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json({ vehicle }, { status: 200 });
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle" },
      { status: 500 },
    );
  }
}

// PUT update vehicle (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(
      { vehicle, message: "Vehicle updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 },
    );
  }
}

// DELETE vehicle (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.vehicle.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Vehicle deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 },
    );
  }
}
