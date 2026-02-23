"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  Users,
  Fuel,
  Settings,
  Loader2,
  X,
  ChevronRight,
  Heart,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [filters, setFilters] = useState({
    type: "all",
    priceMin: "",
    priceMax: "",
    seats: "all",
    transmission: "all",
    fuelType: "all",
    status: "AVAILABLE",
  });

  useEffect(() => {
    fetchVehicles();
  }, [filters, sortBy, searchTerm]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.type !== "all") queryParams.append("type", filters.type);
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.priceMin) queryParams.append("minPrice", filters.priceMin);
      if (filters.priceMax) queryParams.append("maxPrice", filters.priceMax);

      const response = await fetch(`/api/vehicles?${queryParams}`);
      const data = await response.json();

      if (data.vehicles) {
        let filtered = data.vehicles;

        // Apply additional filters
        if (filters.seats !== "all") {
          filtered = filtered.filter(
            (v: any) => v.seats >= parseInt(filters.seats),
          );
        }
        if (filters.transmission !== "all") {
          filtered = filtered.filter(
            (v: any) => v.transmission === filters.transmission,
          );
        }
        if (filters.fuelType !== "all") {
          filtered = filtered.filter(
            (v: any) => v.fuelType === filters.fuelType,
          );
        }
        if (searchTerm) {
          filtered = filtered.filter(
            (v: any) =>
              v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (v.model &&
                v.model.toLowerCase().includes(searchTerm.toLowerCase())),
          );
        }

        // Apply sorting
        switch (sortBy) {
          case "price-asc":
            filtered.sort(
              (a: any, b: any) =>
                parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay),
            );
            break;
          case "price-desc":
            filtered.sort(
              (a: any, b: any) =>
                parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay),
            );
            break;
          case "name-asc":
            filtered.sort((a: any, b: any) => a.name.localeCompare(b.name));
            break;
          case "name-desc":
            filtered.sort((a: any, b: any) => b.name.localeCompare(a.name));
            break;
        }

        setVehicles(filtered);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      type: "all",
      priceMin: "",
      priceMax: "",
      seats: "all",
      transmission: "all",
      fuelType: "all",
      status: "AVAILABLE",
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700 sticky top-0 z-10">
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
                href="/bookings"
                className="text-zinc-300 hover:text-amber-400 transition font-light tracking-wide uppercase"
              >
                Bookings
              </Link>
              <Link
                href="/profile"
                className="text-zinc-300 hover:text-amber-400 transition font-light tracking-wide uppercase"
              >
                Profile
              </Link>
              <Link
                href="/login"
                className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-2 rounded font-medium tracking-wide transition uppercase"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            FIND YOUR PERFECT RIDE
          </h1>
          <p className="text-lg text-zinc-400 font-light">
            Browse our premium collection of vehicles
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-zinc-800 rounded-2xl shadow-lg p-6 mb-8 border border-zinc-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, brand, or model..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Sort and Filter Buttons */}
            <div className="flex gap-3">
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer font-light"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition flex items-center gap-2 font-light tracking-wide uppercase text-white"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-zinc-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                    Vehicle Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                  >
                    <option value="all">All Types</option>
                    <option value="CAR">Car</option>
                    <option value="MOTORCYCLE">Motorcycle</option>
                    <option value="BIKE">Bike</option>
                    <option value="VAN">Van</option>
                    <option value="TRUCK">Truck</option>
                    <option value="SCOOTER">Scooter</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                    Min Seats
                  </label>
                  <select
                    value={filters.seats}
                    onChange={(e) =>
                      setFilters({ ...filters, seats: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                  >
                    <option value="all">Any</option>
                    <option value="2">2+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                    <option value="7">7+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                    Transmission
                  </label>
                  <select
                    value={filters.transmission}
                    onChange={(e) =>
                      setFilters({ ...filters, transmission: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                  >
                    <option value="all">All</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                    Fuel Type
                  </label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) =>
                      setFilters({ ...filters, fuelType: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                  >
                    <option value="all">All</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) =>
                      setFilters({ ...filters, priceMin: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) =>
                      setFilters({ ...filters, priceMax: e.target.value })
                    }
                    placeholder="1000"
                    className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                  />
                </div>

                <div className="lg:col-span-2 flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 border border-zinc-600 text-zinc-300 rounded-lg hover:bg-zinc-700 transition flex items-center justify-center gap-2 font-light tracking-wide uppercase"
                  >
                    <X className="w-4 h-4" />
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-zinc-400 font-light">
            Showing{" "}
            <span className="font-medium text-white">{vehicles.length}</span>{" "}
            vehicles
          </p>
        </div>

        {/* Vehicle Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-zinc-700 cursor-pointer"
                onClick={() => router.push(`/vehicles/${vehicle.id}`)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={
                      vehicle.thumbnail ||
                      vehicle.images?.[0] ||
                      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"
                    }
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {vehicle.status === "AVAILABLE" && (
                      <span className="bg-green-900/80 backdrop-blur-sm text-green-300 px-3 py-1 rounded-lg text-xs font-light tracking-wide uppercase border border-green-800">
                        Available
                      </span>
                    )}
                    {vehicle.status === "RENTED" && (
                      <span className="bg-orange-900/80 backdrop-blur-sm text-orange-300 px-3 py-1 rounded-lg text-xs font-light tracking-wide uppercase border border-orange-800">
                        Rented
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-light text-sm text-white">4.9</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-sm p-2 rounded-lg hover:bg-zinc-800 transition"
                  >
                    <Heart className="w-4 h-4 text-zinc-300" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-light text-white tracking-wide">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light">
                      {vehicle.brand} {vehicle.model && `• ${vehicle.model}`} •{" "}
                      {vehicle.year}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-light">
                        {vehicle.seats}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Settings className="w-4 h-4" />
                      <span className="text-xs font-light">
                        {vehicle.transmission}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Fuel className="w-4 h-4" />
                      <span className="text-xs font-light">
                        {vehicle.fuelType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
                    <div>
                      <span className="text-3xl font-light text-white">
                        ${vehicle.pricePerDay}
                      </span>
                      <span className="text-zinc-400 text-sm font-light">
                        /day
                      </span>
                    </div>
                    <button className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-5 py-2 rounded-lg transition transform hover:scale-105 flex items-center gap-2 font-medium tracking-wide uppercase">
                      View
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-800 rounded-2xl shadow-lg p-12 text-center border border-zinc-700">
            <Car className="w-20 h-20 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-2xl font-light text-white mb-2 tracking-wide uppercase">
              No vehicles found
            </h3>
            <p className="text-zinc-400 font-light mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={resetFilters}
              className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-3 rounded-lg transition font-medium tracking-wide uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
