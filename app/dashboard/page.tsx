"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  User,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Award,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    image: null as string | null,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user) {
      setUser({
        name: session.user.name || "User",
        email: session.user.email || "",
        phone: "+1 (555) 123-4567",
        image: session.user.image || null,
      });
      fetchBookings();
    }
  }, [session, status, router]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Simulated data for demo - replace with actual API call
      setBookings([
        {
          id: "1",
          status: "CONFIRMED",
          startDate: "2026-02-25",
          endDate: "2026-03-01",
          totalDays: 5,
          totalPrice: 445,
          pickupLocation: "New York, NY",
          dropoffLocation: "New York, NY",
          vehicle: {
            name: "Tesla Model 3",
            brand: "Tesla",
            thumbnail:
              "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400",
            pricePerDay: 89,
          },
          createdAt: "2026-02-20",
        },
        {
          id: "2",
          status: "PENDING",
          startDate: "2026-03-10",
          endDate: "2026-03-15",
          totalDays: 5,
          totalPrice: 645,
          pickupLocation: "Los Angeles, CA",
          dropoffLocation: "San Francisco, CA",
          vehicle: {
            name: "BMW X5",
            brand: "BMW",
            thumbnail:
              "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
            pricePerDay: 129,
          },
          createdAt: "2026-02-18",
        },
        {
          id: "3",
          status: "COMPLETED",
          startDate: "2026-02-01",
          endDate: "2026-02-05",
          totalDays: 4,
          totalPrice: 396,
          pickupLocation: "Miami, FL",
          dropoffLocation: "Miami, FL",
          vehicle: {
            name: "Mercedes C-Class",
            brand: "Mercedes",
            thumbnail:
              "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
            pricePerDay: 99,
          },
          createdAt: "2026-01-28",
        },
      ]);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-amber-600/20 text-amber-300 border-amber-600/30";
      case "PENDING":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30";
      case "COMPLETED":
        return "bg-green-600/20 text-green-300 border-green-600/30";
      case "CANCELLED":
        return "bg-red-600/20 text-red-300 border-red-600/30";
      default:
        return "bg-zinc-700 text-zinc-300 border-zinc-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle2 className="w-4 h-4" />;
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "COMPLETED":
        return <CheckCircle2 className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-amber-600/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="bg-amber-600 p-2 rounded-xl">
                <Car className="w-6 h-6 text-zinc-900" />
              </div>
              <span className="text-2xl font-light tracking-wide text-amber-200">
                RENTRIDE
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/vehicles"
                className="text-zinc-300 hover:text-amber-600 transition font-light tracking-wide uppercase"
              >
                Browse Vehicles
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-zinc-900 font-medium">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-light text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-zinc-400">{user.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-2xl shadow-2xl border border-amber-600/20 overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-amber-600 to-amber-700 text-zinc-900">
                <div className="w-20 h-20 bg-zinc-900/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-light mx-auto mb-4">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-light text-center tracking-wide">
                  {user.name}
                </h2>
                <p className="text-zinc-800 text-center text-sm font-light">
                  {user.email}
                </p>
              </div>

              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-light tracking-wide ${
                    activeTab === "bookings"
                      ? "bg-amber-600 text-zinc-900"
                      : "text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  MY BOOKINGS
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-light tracking-wide ${
                    activeTab === "profile"
                      ? "bg-amber-600 text-zinc-900"
                      : "text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <User className="w-5 h-5" />
                  PROFILE
                </button>
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-light tracking-wide ${
                    activeTab === "payments"
                      ? "bg-amber-600 text-zinc-900"
                      : "text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  PAYMENTS
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-light tracking-wide ${
                    activeTab === "settings"
                      ? "bg-amber-600 text-zinc-900"
                      : "text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  SETTINGS
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition font-light tracking-wide"
                >
                  <LogOut className="w-5 h-5" />
                  SIGN OUT
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-light text-white tracking-wide uppercase">
                    My Bookings
                  </h1>
                  <Link
                    href="/vehicles"
                    className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-2 rounded-lg transition flex items-center gap-2 font-light tracking-wide uppercase"
                  >
                    Book New Vehicle
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-zinc-800 rounded-xl shadow-2xl p-6 border border-amber-600/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400 mb-1 uppercase tracking-wide font-light">
                          Active Bookings
                        </p>
                        <p className="text-3xl font-light text-amber-600">
                          {
                            bookings.filter(
                              (b) =>
                                b.status === "CONFIRMED" ||
                                b.status === "PENDING",
                            ).length
                          }
                        </p>
                      </div>
                      <Calendar className="w-12 h-12 text-amber-600 opacity-20" />
                    </div>
                  </div>
                  <div className="bg-zinc-800 rounded-xl shadow-2xl p-6 border border-amber-600/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400 mb-1 uppercase tracking-wide font-light">
                          Completed Trips
                        </p>
                        <p className="text-3xl font-light text-green-500">
                          {
                            bookings.filter((b) => b.status === "COMPLETED")
                              .length
                          }
                        </p>
                      </div>
                      <CheckCircle2 className="w-12 h-12 text-green-500 opacity-20" />
                    </div>
                  </div>
                  <div className="bg-zinc-800 rounded-xl shadow-2xl p-6 border border-amber-600/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400 mb-1 uppercase tracking-wide font-light">
                          Total Spent
                        </p>
                        <p className="text-3xl font-light text-amber-600">
                          ${bookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                        </p>
                      </div>
                      <CreditCard className="w-12 h-12 text-amber-600 opacity-20" />
                    </div>
                  </div>
                </div>

                {/* Bookings List */}
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-zinc-800 rounded-2xl shadow-2xl border border-amber-600/20 overflow-hidden hover:shadow-amber-600/10 transition"
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Vehicle Image */}
                            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={booking.vehicle.thumbnail}
                                alt={booking.vehicle.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Booking Details */}
                            <div className="flex-1 space-y-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-xl font-light text-white tracking-wide">
                                    {booking.vehicle.name}
                                  </h3>
                                  <p className="text-zinc-400 font-light">
                                    {booking.vehicle.brand}
                                  </p>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-light border flex items-center gap-1 uppercase tracking-wide ${getStatusColor(
                                    booking.status,
                                  )}`}
                                >
                                  {getStatusIcon(booking.status)}
                                  {booking.status}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-zinc-400">
                                  <Calendar className="w-4 h-4 text-amber-600" />
                                  <span className="text-sm font-light">
                                    {new Date(
                                      booking.startDate,
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                      booking.endDate,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                  <Clock className="w-4 h-4 text-amber-600" />
                                  <span className="text-sm font-light">
                                    {booking.totalDays} days
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                  <MapPin className="w-4 h-4 text-amber-600" />
                                  <span className="text-sm font-light">
                                    {booking.pickupLocation}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                  <CreditCard className="w-4 h-4 text-amber-600" />
                                  <span className="text-sm font-light">
                                    ${booking.totalPrice}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <button className="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition text-sm font-light tracking-wide text-zinc-300">
                                  VIEW DETAILS
                                </button>
                                {booking.status === "PENDING" && (
                                  <button className="px-4 py-2 border border-red-600/50 text-red-400 rounded-lg hover:bg-red-900/20 transition text-sm font-light tracking-wide">
                                    CANCEL BOOKING
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-zinc-800 rounded-2xl shadow-2xl p-12 text-center border border-amber-600/20">
                    <Calendar className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-white mb-2 tracking-wide uppercase">
                      No bookings yet
                    </h3>
                    <p className="text-zinc-400 mb-6 font-light">
                      Start your journey by booking your first vehicle!
                    </p>
                    <Link
                      href="/vehicles"
                      className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-3 rounded-lg transition inline-flex items-center gap-2 font-light tracking-wide uppercase"
                    >
                      Browse Vehicles
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-zinc-800 rounded-2xl shadow-2xl p-8 border border-amber-600/20">
                <h1 className="text-3xl font-light text-white mb-8 tracking-wide uppercase">
                  Profile Settings
                </h1>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-8 py-3 rounded-lg transition font-light tracking-wide uppercase">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="bg-zinc-800 rounded-2xl shadow-2xl p-8 border border-amber-600/20">
                <h1 className="text-3xl font-light text-white mb-8 tracking-wide uppercase">
                  Payment Methods
                </h1>
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400 font-light">
                    No payment methods added yet
                  </p>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-zinc-800 rounded-2xl shadow-2xl p-8 border border-amber-600/20">
                <h1 className="text-3xl font-light text-white mb-8 tracking-wide uppercase">
                  Settings
                </h1>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400 font-light">
                    Settings coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
