import {
  User,
  Vehicle,
  Booking,
  Role,
  BookingStatus,
  VehicleStatus,
  VehicleType,
} from "@prisma/client";

export type {
  User,
  Vehicle,
  Booking,
  Role,
  BookingStatus,
  VehicleStatus,
  VehicleType,
};

// Extended types with relations
export type VehicleWithBookings = Vehicle & {
  bookings: Booking[];
};

export type BookingWithRelations = Booking & {
  user: User;
  vehicle: Vehicle;
};

export type UserWithBookings = User & {
  bookings: BookingWithRelations[];
};

// API Response types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

// Form types
export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type BookingFormData = {
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropoffLocation?: string;
  notes?: string;
};

// Session type extension
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      role: Role;
    };
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
