"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  ArrowLeft,
  Star,
  Users,
  Gauge,
  Fuel,
  Settings,
  Shield,
  Calendar,
  MapPin,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  Award,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function VehicleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;

  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    notes: "",
  });

  useEffect(() => {
    fetchVehicle();
  }, [vehicleId]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      // Simulated data for demo - replace with actual API call
      setVehicle({
        id: vehicleId,
        name: "Tesla Model 3",
        brand: "Tesla",
        model: "Model 3",
        year: 2024,
        type: "CAR",
        status: "AVAILABLE",
        description:
          "Experience the future of driving with the Tesla Model 3. This premium electric sedan combines cutting-edge technology, exceptional performance, and zero emissions. Perfect for both city commutes and long-distance journeys.",
        features: [
          "Autopilot",
          "Premium Audio System",
          "Glass Roof",
          "Heated Seats",
          "Supercharger Access",
          "Mobile App Control",
          "360° Camera",
          "Wireless Charging",
        ],
        pricePerDay: 89,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Electric",
        images: [
          "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
          "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80",
        ],
        thumbnail:
          "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
        registrationNo: "TES-001",
        mileage: 15000,
      });
    } catch (err) {
      setError("Failed to load vehicle");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    return days > 0 ? days * vehicle.pricePerDay : 0;
  };

  const handleBookingSubmit = async () => {
    if (
      !bookingData.startDate ||
      !bookingData.endDate ||
      !bookingData.pickupLocation
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setBookingLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          ...bookingData,
        }),
      });

      if (response.ok) {
        setBookingSuccess(true);
        setTimeout(() => {
          router.push("/bookings");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || "Booking failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-white tracking-wide">
            Vehicle not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-amber-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/vehicles"
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-600 transition font-light tracking-wide"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK TO VEHICLES
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden border border-amber-600/20">
              <div className="aspect-video relative">
                <img
                  src={vehicle.images[selectedImage]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-zinc-900 px-4 py-2 rounded-lg font-light tracking-wide uppercase">
                  {vehicle.status}
                </div>
              </div>
              <div className="p-4 grid grid-cols-3 gap-4">
                {vehicle.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx
                        ? "border-amber-600"
                        : "border-zinc-700"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-zinc-800 rounded-2xl shadow-2xl p-8 border border-amber-600/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-light text-white mb-2 tracking-wide">
                    {vehicle.name}
                  </h1>
                  <p className="text-xl text-zinc-400 font-light">
                    {vehicle.brand} {vehicle.model} • {vehicle.year}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-zinc-900 px-4 py-2 rounded-lg">
                  <Star className="w-6 h-6 fill-amber-600 text-amber-600" />
                  <span className="text-2xl font-light text-white">4.9</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-zinc-900 rounded-xl p-4 border border-amber-600/20">
                  <Users className="w-6 h-6 text-amber-600 mb-2" />
                  <div className="text-sm text-zinc-400 uppercase tracking-wide">
                    Seats
                  </div>
                  <div className="text-lg font-light text-white">
                    {vehicle.seats}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-xl p-4 border border-amber-600/20">
                  <Settings className="w-6 h-6 text-amber-600 mb-2" />
                  <div className="text-sm text-zinc-400 uppercase tracking-wide">
                    Transmission
                  </div>
                  <div className="text-lg font-light text-white">
                    {vehicle.transmission}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-xl p-4 border border-amber-600/20">
                  <Fuel className="w-6 h-6 text-amber-600 mb-2" />
                  <div className="text-sm text-zinc-400 uppercase tracking-wide">
                    Fuel Type
                  </div>
                  <div className="text-lg font-light text-white">
                    {vehicle.fuelType}
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-xl p-4 border border-amber-600/20">
                  <Gauge className="w-6 h-6 text-amber-600 mb-2" />
                  <div className="text-sm text-zinc-400 uppercase tracking-wide">
                    Mileage
                  </div>
                  <div className="text-lg font-light text-white">
                    {vehicle.mileage?.toLocaleString()} km
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-light text-white mb-4 tracking-wide uppercase">
                  About this vehicle
                </h2>
                <p className="text-zinc-400 leading-relaxed font-light">
                  {vehicle.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-light text-white mb-4 tracking-wide uppercase">
                  Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {vehicle.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                      <span className="text-zinc-300 font-light">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insurance Info */}
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-700/20 rounded-2xl shadow-2xl p-8 border border-amber-600/30">
              <div className="flex items-start gap-4">
                <div className="bg-amber-600 p-3 rounded-xl shrink-0">
                  <Shield className="w-8 h-8 text-zinc-900" />
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-2 tracking-wide uppercase">
                    Fully Insured & Protected
                  </h3>
                  <p className="text-zinc-300 font-light">
                    All our vehicles come with comprehensive insurance coverage,
                    24/7 roadside assistance, and complete peace of mind for
                    your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-2xl shadow-2xl p-6 border border-amber-600/20 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-light text-white">
                    ${vehicle.pricePerDay}
                  </span>
                  <span className="text-zinc-400 font-light">/day</span>
                </div>
                <p className="text-sm text-zinc-500 font-light">
                  Free cancellation up to 24 hours before pickup
                </p>
              </div>

              <div className="space-y-4">
                {/* Pickup Date */}
                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 flex items-center gap-2 uppercase tracking-wide">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    value={bookingData.startDate}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        startDate: e.target.value,
                      })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 flex items-center gap-2 uppercase tracking-wide">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    Return Date *
                  </label>
                  <input
                    type="date"
                    value={bookingData.endDate}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        endDate: e.target.value,
                      })
                    }
                    min={
                      bookingData.startDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 flex items-center gap-2 uppercase tracking-wide">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    value={bookingData.pickupLocation}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        pickupLocation: e.target.value,
                      })
                    }
                    placeholder="Enter pickup address"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Dropoff Location */}
                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 flex items-center gap-2 uppercase tracking-wide">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    Drop-off Location
                  </label>
                  <input
                    type="text"
                    value={bookingData.dropoffLocation}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        dropoffLocation: e.target.value,
                      })
                    }
                    placeholder="Same as pickup"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                    Special Requests
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, notes: e.target.value })
                    }
                    placeholder="Any special requirements?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                  />
                </div>

                {/* Price Breakdown */}
                {calculateTotal() > 0 && (
                  <div className="bg-zinc-900 rounded-lg p-4 space-y-2 border border-zinc-700">
                    <div className="flex justify-between text-zinc-400 font-light">
                      <span>
                        ${vehicle.pricePerDay} ×{" "}
                        {Math.ceil(
                          (new Date(bookingData.endDate).getTime() -
                            new Date(bookingData.startDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 font-light">
                      <span>Service fee</span>
                      <span>$10</span>
                    </div>
                    <div className="border-t border-zinc-700 pt-2 flex justify-between font-light text-lg text-white">
                      <span>Total</span>
                      <span className="text-amber-600">
                        ${calculateTotal() + 10}
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBookingSubmit}
                  disabled={
                    bookingLoading ||
                    !bookingData.startDate ||
                    !bookingData.endDate
                  }
                  className="w-full bg-amber-600 hover:bg-amber-700 text-zinc-900 py-4 rounded-lg font-light tracking-wide uppercase transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : bookingSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Booking Confirmed!
                    </>
                  ) : (
                    "Book Now"
                  )}
                </button>

                <p className="text-xs text-center text-zinc-500 font-light">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
