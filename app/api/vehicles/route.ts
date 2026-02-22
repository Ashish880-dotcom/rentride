import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// GET all vehicles
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: any = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) where.pricePerDay.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerDay.lte = parseFloat(maxPrice);
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 },
    );
  }
}

// POST create new vehicle (Admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      brand,
      model,
      year,
      type,
      description,
      features,
      pricePerDay,
      seats,
      transmission,
      fuelType,
      images,
      thumbnail,
      registrationNo,
      mileage,
    } = body;

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        brand,
        model,
        year: parseInt(year),
        type,
        description,
        features,
        pricePerDay: parseFloat(pricePerDay),
        seats: parseInt(seats),
        transmission,
        fuelType,
        images,
        thumbnail,
        registrationNo,
        mileage: mileage ? parseInt(mileage) : null,
        status: "AVAILABLE",
      },
    });

    return NextResponse.json(
      { vehicle, message: "Vehicle created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 },
    );
  }
}
