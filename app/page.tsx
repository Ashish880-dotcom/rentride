"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Car,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Menu,
  X,
  Calendar,
  MapPin,
  Search,
  Phone,
  Mail,
  Users,
  Award,
  Zap,
  Heart,
  ArrowRight,
  Play,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export default function RentRideLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const vehicles = [
    {
      id: 1,
      name: "Tesla Model S",
      type: "Electric Luxury",
      price: 149,
      originalPrice: 179,
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
      rating: 4.9,
      seats: 5,
      transmission: "Auto",
      category: "luxury",
      features: ["Autopilot", "Supercharging", "Premium Interior"],
      popular: true,
    },
    {
      id: 2,
      name: "BMW X5 M Sport",
      type: "Luxury SUV",
      price: 129,
      originalPrice: 159,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      rating: 4.8,
      seats: 7,
      transmission: "Auto",
      category: "suv",
      features: ["All-Wheel Drive", "Panoramic Roof", "Premium Sound"],
    },
    {
      id: 3,
      name: "Mercedes C-Class AMG",
      type: "Premium Sedan",
      price: 119,
      originalPrice: 139,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      rating: 4.9,
      seats: 5,
      transmission: "Auto",
      category: "luxury",
      features: ["AMG Performance", "MBUX System", "LED Headlights"],
    },
    {
      id: 4,
      name: "Porsche 911 Carrera",
      type: "Sports Car",
      price: 299,
      originalPrice: 349,
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      rating: 5.0,
      seats: 2,
      transmission: "Manual/Auto",
      category: "sports",
      features: ["Sport Chrono", "PASM", "Sport Exhaust"],
      popular: true,
    },
    {
      id: 5,
      name: "Range Rover Evoque",
      type: "Compact SUV",
      price: 99,
      originalPrice: 119,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      rating: 4.7,
      seats: 5,
      transmission: "Auto",
      category: "suv",
      features: ["Terrain Response", "Meridian Audio", "Pivi Pro"],
    },
    {
      id: 6,
      name: "Audi A4 Quattro",
      type: "Executive Sedan",
      price: 89,
      originalPrice: 109,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      rating: 4.6,
      seats: 5,
      transmission: "Auto",
      category: "luxury",
      features: ["Quattro AWD", "Virtual Cockpit", "Bang & Olufsen"],
    },
    {
      id: 7,
      name: "Ford Mustang GT",
      type: "Muscle Car",
      price: 159,
      originalPrice: 189,
      image:
        "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&q=80",
      rating: 4.8,
      seats: 4,
      transmission: "Manual/Auto",
      category: "sports",
      features: ["V8 Engine", "Track Mode", "Recaro Seats"],
    },
    {
      id: 8,
      name: "Toyota Prius Hybrid",
      type: "Eco-Friendly",
      price: 59,
      originalPrice: 79,
      image:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
      rating: 4.4,
      seats: 5,
      transmission: "CVT",
      category: "economy",
      features: ["Hybrid System", "Eco Mode", "Toyota Safety 2.0"],
    },
  ];

  const categories = [
    { id: "all", name: "All Vehicles", count: vehicles.length },
    {
      id: "luxury",
      name: "Luxury",
      count: vehicles.filter((v) => v.category === "luxury").length,
    },
    {
      id: "suv",
      name: "SUVs",
      count: vehicles.filter((v) => v.category === "suv").length,
    },
    {
      id: "sports",
      name: "Sports",
      count: vehicles.filter((v) => v.category === "sports").length,
    },
    {
      id: "economy",
      name: "Economy",
      count: vehicles.filter((v) => v.category === "economy").length,
    },
  ];

  const filteredVehicles =
    selectedCategory === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.category === selectedCategory);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Executive",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
      rating: 5,
      text: "Amazing service! The Tesla Model S was in perfect condition and the booking process was seamless.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Travel Blogger",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      rating: 5,
      text: "RentRide made my road trip unforgettable. Great cars, fair prices, and excellent customer support!",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Wedding Planner",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      rating: 5,
      text: "Perfect for special occasions. The luxury vehicles always impress our clients. Highly recommended!",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Top Banner */}
      <div className="bg-zinc-800 text-center py-2 px-4">
        <p className="text-amber-200 text-sm font-light tracking-wider">
          FREE DELIVERY ON BOOKINGS OVER $200 — CRAFTED WITH PASSION SINCE 2024
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-zinc-900/95 backdrop-blur-lg z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-2 rounded-lg">
                <Car className="w-6 h-6 text-zinc-900" />
              </div>
              <span className="text-2xl font-bold text-amber-200 tracking-wide">
                RentRide
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#vehicles"
                className="text-zinc-300 hover:text-amber-200 transition font-light tracking-wide"
              >
                VEHICLES
              </a>
              <a
                href="#services"
                className="text-zinc-300 hover:text-amber-200 transition font-light tracking-wide"
              >
                SERVICES
              </a>
              <a
                href="#about"
                className="text-zinc-300 hover:text-amber-200 transition font-light tracking-wide"
              >
                ABOUT
              </a>
              <a
                href="#contact"
                className="text-zinc-300 hover:text-amber-200 transition font-light tracking-wide"
              >
                CONTACT
              </a>
              <Link
                href="/dashboard"
                className="text-zinc-300 hover:text-amber-200 transition font-light tracking-wide"
              >
                DASHBOARD
              </Link>
              <Link
                href="/login"
                className="text-zinc-300 hover:text-amber-200 transition font-light tracking-wide"
              >
                SIGN IN
              </Link>
              <Link
                href="/register"
                className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-2 rounded font-medium tracking-wide transition"
              >
                GET STARTED
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-800 text-zinc-300"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#vehicles"
                className="block text-zinc-300 hover:text-amber-200 transition py-2 tracking-wide"
              >
                VEHICLES
              </a>
              <a
                href="#services"
                className="block text-zinc-300 hover:text-amber-200 transition py-2 tracking-wide"
              >
                SERVICES
              </a>
              <a
                href="#about"
                className="block text-zinc-300 hover:text-amber-200 transition py-2 tracking-wide"
              >
                ABOUT
              </a>
              <a
                href="#contact"
                className="block text-zinc-300 hover:text-amber-200 transition py-2 tracking-wide"
              >
                CONTACT
              </a>
              <Link
                href="/dashboard"
                className="block text-zinc-300 hover:text-amber-200 transition py-2 tracking-wide"
              >
                DASHBOARD
              </Link>
              <Link
                href="/login"
                className="block w-full text-left text-zinc-300 hover:text-amber-200 transition py-2 tracking-wide"
              >
                SIGN IN
              </Link>
              <Link
                href="/register"
                className="w-full bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-3 rounded font-medium tracking-wide block text-center"
              >
                GET STARTED
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Car Background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Image - More Visible */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
            alt="Luxury car background"
            className="w-full h-full object-cover"
          />
          {/* Lighter overlay to make car more visible */}
          <div className="absolute inset-0 bg-zinc-900/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              <div className="inline-block">
                <span className="text-amber-200 text-sm font-light tracking-[0.2em] uppercase">
                  EST. 2024 — PREMIUM AUTOMOTIVE RENTAL
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-light text-white leading-tight tracking-tight">
                Every Drive Tells
                <span className="block text-amber-300 font-light italic">
                  a Story
                </span>
              </h1>

              <p className="text-xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
                From remote luxury garages to your morning commute. Discover
                premium vehicles and rare classics, curated for the connoisseur.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
                <button className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-8 py-4 rounded font-medium tracking-wide transition flex items-center gap-2 group">
                  EXPLORE COLLECTION
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-zinc-400 hover:border-amber-300 text-zinc-300 hover:text-amber-300 px-8 py-4 rounded font-light tracking-wide transition">
                  TAKE THE LUXURY QUIZ
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-light text-amber-300">500+</div>
                  <div className="text-zinc-400 font-light tracking-wide">
                    Premium Cars
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-amber-300">50K+</div>
                  <div className="text-zinc-400 font-light tracking-wide">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-amber-300">25+</div>
                  <div className="text-zinc-400 font-light tracking-wide">
                    Cities
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-amber-300">24/7</div>
                  <div className="text-zinc-400 font-light tracking-wide">
                    Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-16 px-4 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 flex items-center gap-2 tracking-wide">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  PICKUP LOCATION
                </label>
                <input
                  type="text"
                  placeholder="Enter city or airport"
                  className="w-full px-4 py-3 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 flex items-center gap-2 tracking-wide">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  PICKUP DATE
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 flex items-center gap-2 tracking-wide">
                  <Clock className="w-4 h-4 text-amber-500" />
                  PICKUP TIME
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 flex items-center gap-2 tracking-wide">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  RETURN DATE
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                />
              </div>

              <div className="flex items-end">
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-zinc-900 px-6 py-3 rounded font-medium tracking-wide transition flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  SEARCH CARS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4 tracking-wide">
              Why Choose RentRide?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
              Experience the difference with our premium service and unmatched
              vehicle selection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700">
              <div className="bg-amber-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Shield className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 tracking-wide">
                FULLY INSURED
              </h3>
              <p className="text-zinc-400 text-sm font-light">
                Comprehensive coverage for complete peace of mind
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700">
              <div className="bg-amber-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Clock className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 tracking-wide">
                24/7 SUPPORT
              </h3>
              <p className="text-zinc-400 text-sm font-light">
                Round-the-clock assistance whenever you need it
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700">
              <div className="bg-amber-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Star className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 tracking-wide">
                BEST PRICES
              </h3>
              <p className="text-zinc-400 text-sm font-light">
                Competitive rates with no hidden fees
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700">
              <div className="bg-amber-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 tracking-wide">
                INSTANT BOOKING
              </h3>
              <p className="text-zinc-400 text-sm font-light">
                Book and drive in minutes, not hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Section */}
      <div id="vehicles" className="py-20 px-4 bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4 tracking-wide">
              Our Premium Fleet
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
              Choose from our extensive collection of luxury vehicles, sports
              cars, and premium SUVs
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded font-light tracking-wide transition ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-zinc-900"
                    : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600 border border-zinc-600"
                }`}
              >
                {category.name.toUpperCase()} ({category.count})
              </button>
            ))}
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/vehicles/${vehicle.id}`}
                className="group bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-zinc-700 relative block"
              >
                {vehicle.popular && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-zinc-900 px-3 py-1 rounded text-xs font-medium z-10 tracking-wide">
                    POPULAR
                  </div>
                )}

                <div className="relative overflow-hidden h-48">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-light text-sm text-white">
                      {vehicle.rating}
                    </span>
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-sm p-2 rounded hover:bg-zinc-800 transition"
                  >
                    <Heart className="w-4 h-4 text-zinc-300" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white tracking-wide">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light">
                      {vehicle.type}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {vehicle.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-zinc-800 text-amber-300 px-2 py-1 rounded font-light"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vehicle.seats}
                      </span>
                      <span className="font-light">{vehicle.transmission}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-light text-white">
                          ${vehicle.price}
                        </span>
                        <span className="text-zinc-400 font-light">/day</span>
                      </div>
                      {vehicle.originalPrice && (
                        <span className="text-sm text-zinc-500 line-through font-light">
                          ${vehicle.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-4 py-2 rounded font-medium tracking-wide transition flex items-center gap-1">
                      VIEW
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-3 rounded font-light tracking-wide transition inline-flex items-center gap-2">
              VIEW ALL {vehicles.length} VEHICLES
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4 tracking-wide">
              What Our Customers Say
            </h2>
            <p className="text-zinc-400 text-lg font-light">
              Join thousands of satisfied customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-zinc-800 p-6 rounded-xl border border-zinc-700"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-300 mb-4 font-light italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-white tracking-wide">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-400 font-light">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-white mb-6 tracking-wide">
            Ready to Start Your Journey?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 font-light">
            Join over 50,000 happy customers and experience the future of car
            rental today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-zinc-900 px-8 py-4 rounded font-medium tracking-wide transition flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              BROWSE ALL VEHICLES
            </button>
            <button className="border border-zinc-500 hover:border-amber-400 text-zinc-300 hover:text-amber-300 px-8 py-4 rounded font-light tracking-wide transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              CALL US NOW
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-16 px-4 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-2 rounded-lg">
                  <Car className="w-5 h-5 text-zinc-900" />
                </div>
                <span className="text-xl font-bold text-amber-200 tracking-wide">
                  RentRide
                </span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 max-w-md font-light leading-relaxed">
                Premium vehicle rentals for every journey. Experience luxury,
                comfort, and reliability with our extensive fleet of premium
                cars.
              </p>
              <div className="flex space-x-4">
                <button className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg transition">
                  <Facebook className="w-5 h-5 text-zinc-400" />
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg transition">
                  <Twitter className="w-5 h-5 text-zinc-400" />
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg transition">
                  <Instagram className="w-5 h-5 text-zinc-400" />
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg transition">
                  <Youtube className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-amber-200 tracking-wide">
                COMPANY
              </h4>
              <ul className="space-y-2 text-zinc-400 text-sm font-light">
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Our Fleet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-amber-200 tracking-wide">
                SERVICES
              </h4>
              <ul className="space-y-2 text-zinc-400 text-sm font-light">
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Car Rental
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Luxury Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Corporate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Long Term
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Airport
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-amber-200 tracking-wide">
                SUPPORT
              </h4>
              <ul className="space-y-2 text-zinc-400 text-sm font-light">
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-200 transition">
                    Roadside Assistance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-400 text-sm font-light">
              &copy; 2026 RentRide. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-zinc-400 hover:text-amber-200 text-sm transition font-light"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-amber-200 text-sm transition font-light"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-amber-200 text-sm transition font-light"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
