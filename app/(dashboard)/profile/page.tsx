"use client";

import React, { useState } from "react";
import {
  Car,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Loader2,
  ArrowLeft,
  Shield,
  CreditCard,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1000);
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
              <Link
                href="/vehicles"
                className="text-zinc-300 hover:text-amber-400 transition font-light tracking-wide uppercase"
              >
                Vehicles
              </Link>
              <Link
                href="/bookings"
                className="text-zinc-300 hover:text-amber-400 transition font-light tracking-wide uppercase"
              >
                Bookings
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
            MY PROFILE
          </h1>
          <p className="text-zinc-400 font-light">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-zinc-900" />
                </div>
                <h2 className="text-2xl font-light text-white tracking-wide mb-1">
                  {session?.user?.name || "User"}
                </h2>
                <p className="text-zinc-400 font-light mb-4">
                  {session?.user?.email}
                </p>
                <div className="inline-flex items-center gap-2 bg-amber-900/20 text-amber-400 px-4 py-2 rounded-lg border border-amber-800 text-sm font-light tracking-wide uppercase">
                  <Shield className="w-4 h-4" />
                  {session?.user?.role || "USER"}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-700 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 font-light">Member Since</span>
                  <span className="text-white font-light">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 font-light">
                    Total Bookings
                  </span>
                  <span className="text-white font-light">0</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 font-light">
                    Loyalty Points
                  </span>
                  <span className="text-amber-400 font-light">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-white tracking-wide uppercase">
                  Personal Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition font-light tracking-wide uppercase"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-zinc-900 px-4 py-2 rounded-lg font-medium tracking-wide transition uppercase"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded-lg font-light tracking-wide transition uppercase"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 tracking-wide uppercase">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 tracking-wide uppercase">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 tracking-wide uppercase">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-zinc-300 tracking-wide uppercase">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Your address"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-white tracking-wide uppercase">
                  Payment Methods
                </h3>
                <button className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition font-light tracking-wide uppercase">
                  <CreditCard className="w-4 h-4" />
                  Add Card
                </button>
              </div>
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400 font-light">
                  No payment methods added yet
                </p>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-light text-white tracking-wide uppercase">
                  Notification Preferences
                </h3>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-zinc-300 font-light">
                    Email notifications
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded border-zinc-600 bg-zinc-900 text-amber-600 focus:ring-2 focus:ring-amber-500"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-zinc-300 font-light">
                    Booking reminders
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded border-zinc-600 bg-zinc-900 text-amber-600 focus:ring-2 focus:ring-amber-500"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-zinc-300 font-light">
                    Promotional offers
                  </span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-zinc-600 bg-zinc-900 text-amber-600 focus:ring-2 focus:ring-amber-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
