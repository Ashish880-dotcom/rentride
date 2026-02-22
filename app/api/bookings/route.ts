import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// GET user's bookings
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        vehicle: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

// POST create new booking
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      vehicleId,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      notes,
    } = body;

    // Check if vehicle exists and is available
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    if (vehicle.status !== "AVAILABLE") {
      return NextResponse.json(
        { error: "Vehicle is not available" },
        { status: 400 },
      );
    }

    // Check for conflicting bookings
    const start = new Date(startDate);
    const end = new Date(endDate);

    const conflictingBookings = await prisma.booking.findFirst({
      where: {
        vehicleId,
        status: {
          in: ["CONFIRMED", "PENDING"],
        },
        OR: [
          {
            AND: [{ startDate: { lte: start } }, { endDate: { gte: start } }],
          },
          {
            AND: [{ startDate: { lte: end } }, { endDate: { gte: end } }],
          },
          {
            AND: [{ startDate: { gte: start } }, { endDate: { lte: end } }],
          },
        ],
      },
    });

    if (conflictingBookings) {
      return NextResponse.json(
        { error: "Vehicle is already booked for these dates" },
        { status: 400 },
      );
    }

    // Calculate total days and price
    const totalDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalPrice = vehicle.pricePerDay.toNumber() * totalDays;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        vehicleId,
        startDate: start,
        endDate: end,
        totalDays,
        totalPrice,
        pickupLocation,
        dropoffLocation,
        notes,
        status: "PENDING",
      },
      include: {
        vehicle: true,
      },
    });

    // Update vehicle status
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { status: "RENTED" },
    });

    return NextResponse.json(
      { booking, message: "Booking created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
