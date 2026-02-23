"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowLeft,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  const stats = [
    {
      label: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      label: "Active Bookings",
      value: "23",
      change: "+5.2%",
      icon: Calendar,
      color: "text-amber-400",
    },
    {
      label: "Total Vehicles",
      value: "48",
      change: "+2",
      icon: Car,
      color: "text-blue-400",
    },
    {
      label: "Total Users",
      value: "1,234",
      change: "+18.3%",
      icon: Users,
      color: "text-purple-400",
    },
  ];

  const recentBookings = [
    {
      id: "1",
      user: "John Doe",
      vehicle: "Tesla Model S",
      startDate: "2024-02-25",
      endDate: "2024-02-28",
      status: "CONFIRMED",
      total: "$447",
    },
    {
      id: "2",
      user: "Jane Smith",
      vehicle: "BMW X5",
      startDate: "2024-02-26",
      endDate: "2024-03-01",
      status: "PENDING",
      total: "$387",
    },
    {
      id: "3",
      user: "Mike Johnson",
      vehicle: "Mercedes C-Class",
      startDate: "2024-02-24",
      endDate: "2024-02-27",
      status: "COMPLETED",
      total: "$357",
    },
  ];

  const vehicles = [
    {
      id: "1",
      name: "Tesla Model S",
      type: "CAR",
      status: "AVAILABLE",
      pricePerDay: 149,
      bookings: 12,
    },
    {
      id: "2",
      name: "BMW X5",
      type: "CAR",
      status: "RENTED",
      pricePerDay: 129,
      bookings: 8,
    },
    {
      id: "3",
      name: "Mercedes C-Class",
      type: "CAR",
      status: "MAINTENANCE",
      pricePerDay: 119,
      bookings: 15,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
      case "AVAILABLE":
        return "bg-green-900/20 text-green-400 border-green-800";
      case "PENDING":
        return "bg-amber-900/20 text-amber-400 border-amber-800";
      case "CANCELLED":
        return "bg-red-900/20 text-red-400 border-red-800";
      case "COMPLETED":
        return "bg-blue-900/20 text-blue-400 border-blue-800";
      case "RENTED":
        return "bg-purple-900/20 text-purple-400 border-purple-800";
      case "MAINTENANCE":
        return "bg-orange-900/20 text-orange-400 border-orange-800";
      default:
        return "bg-zinc-700 text-zinc-300 border-zinc-600";
    }
  };

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
              <span className="text-zinc-400 font-light">
                Welcome, {session?.user?.name}
              </span>
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
            ADMIN DASHBOARD
          </h1>
          <p className="text-zinc-400 font-light">
            Manage vehicles, bookings, and users
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "vehicles", label: "Vehicles" },
            { id: "bookings", label: "Bookings" },
            { id: "users", label: "Users" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-light tracking-wide transition uppercase ${
                activeTab === tab.id
                  ? "bg-amber-600 text-zinc-900"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-zinc-700 p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-green-400 text-sm font-light">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-light text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-400 font-light uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-light text-white tracking-wide uppercase">
                  Recent Bookings
                </h2>
                <Link
                  href="#"
                  className="text-amber-400 hover:text-amber-300 transition font-light tracking-wide uppercase text-sm"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 px-4 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        User
                      </th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Vehicle
                      </th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Dates
                      </th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-zinc-700 hover:bg-zinc-700/50 transition"
                      >
                        <td className="py-4 px-4 text-white font-light">
                          {booking.user}
                        </td>
                        <td className="py-4 px-4 text-zinc-300 font-light">
                          {booking.vehicle}
                        </td>
                        <td className="py-4 px-4 text-zinc-400 font-light text-sm">
                          {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-light tracking-wide uppercase ${getStatusColor(booking.status)}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right text-white font-light">
                          {booking.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-3 rounded-lg font-medium tracking-wide transition uppercase">
                <Plus className="w-5 h-5" />
                Add Vehicle
              </button>
            </div>

            <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700 bg-zinc-900">
                      <th className="text-left py-4 px-6 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Vehicle
                      </th>
                      <th className="text-left py-4 px-6 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Type
                      </th>
                      <th className="text-left py-4 px-6 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Price/Day
                      </th>
                      <th className="text-left py-4 px-6 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Bookings
                      </th>
                      <th className="text-right py-4 px-6 text-zinc-400 font-light uppercase tracking-wide text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="border-b border-zinc-700 hover:bg-zinc-700/50 transition"
                      >
                        <td className="py-4 px-6 text-white font-light">
                          {vehicle.name}
                        </td>
                        <td className="py-4 px-6 text-zinc-300 font-light">
                          {vehicle.type}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-light tracking-wide uppercase ${getStatusColor(vehicle.status)}`}
                          >
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white font-light">
                          ${vehicle.pricePerDay}
                        </td>
                        <td className="py-4 px-6 text-zinc-300 font-light">
                          {vehicle.bookings}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-amber-400 hover:bg-zinc-700 rounded-lg transition">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-400 hover:bg-zinc-700 rounded-lg transition">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-12 text-center">
            <Calendar className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-light text-white mb-2 tracking-wide uppercase">
              Bookings Management
            </h3>
            <p className="text-zinc-400 font-light">
              View and manage all customer bookings
            </p>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-12 text-center">
            <Users className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-light text-white mb-2 tracking-wide uppercase">
              User Management
            </h3>
            <p className="text-zinc-400 font-light">
              View and manage all registered users
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
