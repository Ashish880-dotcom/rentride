"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings");
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-900/20 text-green-400 border-green-800";
      case "PENDING":
        return "bg-amber-900/20 text-amber-400 border-amber-800";
      case "CANCELLED":
        return "bg-red-900/20 text-red-400 border-red-800";
      case "COMPLETED":
        return "bg-blue-900/20 text-blue-400 border-blue-800";
      default:
        return "bg-zinc-700 text-zinc-300 border-zinc-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="w-4 h-4" />;
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
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
                className="text-zinc-300 hover:text-amber-400 transition font-light tracking-wide uppercase"
              >
                Vehicles
              </Link>
              <Link
                href="/profile"
                className="text-zinc-300 hover:text-amber-400 transition font-light tracking-wide uppercase"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition mb-8 font-light tracking-wide"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO HOME
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-white mb-2 tracking-wide">
            MY BOOKINGS
          </h1>
          <p className="text-zinc-400 font-light">
            View and manage your vehicle reservations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: "all", label: "All Bookings" },
            { id: "PENDING", label: "Pending" },
            { id: "CONFIRMED", label: "Confirmed" },
            { id: "COMPLETED", label: "Completed" },
            { id: "CANCELLED", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-3 rounded-lg font-light tracking-wide transition uppercase ${
                filter === tab.id
                  ? "bg-amber-600 text-zinc-900"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 overflow-hidden hover:shadow-2xl transition"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                  {/* Vehicle Image */}
                  <div className="lg:col-span-1">
                    <div className="relative h-48 lg:h-full rounded-xl overflow-hidden">
                      <img
                        src={
                          booking.vehicle?.image ||
                          "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"
                        }
                        alt={booking.vehicle?.name || "Vehicle"}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-lg border flex items-center gap-2 text-sm font-light tracking-wide uppercase ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-light text-white tracking-wide">
                          {booking.vehicle?.name || "Vehicle Name"}
                        </h3>
                        <p className="text-zinc-400 font-light">
                          {booking.vehicle?.brand} • {booking.vehicle?.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-light text-amber-300">
                          ${booking.totalPrice}
                        </div>
                        <div className="text-sm text-zinc-400 font-light">
                          Total Cost
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-zinc-700 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400 font-light uppercase tracking-wide">
                            Pickup Date
                          </div>
                          <div className="text-white font-light">
                            {new Date(booking.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-zinc-700 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400 font-light uppercase tracking-wide">
                            Return Date
                          </div>
                          <div className="text-white font-light">
                            {new Date(booking.endDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-zinc-700 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400 font-light uppercase tracking-wide">
                            Duration
                          </div>
                          <div className="text-white font-light">
                            {booking.totalDays} Days
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-zinc-700 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-400 font-light uppercase tracking-wide">
                          Pickup Location
                        </div>
                        <div className="text-white font-light">
                          {booking.pickupLocation}
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                        <div className="text-sm text-zinc-400 font-light uppercase tracking-wide mb-1">
                          Notes
                        </div>
                        <div className="text-white font-light">
                          {booking.notes}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-2 rounded-lg font-medium tracking-wide transition uppercase">
                        View Details
                      </button>
                      {booking.status === "PENDING" && (
                        <button className="border border-red-600 text-red-400 hover:bg-red-900/20 px-6 py-2 rounded-lg font-light tracking-wide transition uppercase">
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-800 rounded-2xl shadow-2xl p-12 text-center border border-zinc-700">
            <Calendar className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-light text-white mb-2 tracking-wide uppercase">
              No bookings found
            </h3>
            <p className="text-zinc-400 font-light mb-6">
              You haven't made any bookings yet. Start exploring our premium
              vehicle collection.
            </p>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-3 rounded-lg font-medium tracking-wide transition uppercase"
            >
              Browse Vehicles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
