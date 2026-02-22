"use client";

import React, { useState } from "react";
import {
  Car,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <div className="bg-zinc-800 rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border border-amber-600/20">
          <div className="bg-amber-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-3xl font-light text-white mb-4 tracking-wide uppercase">
            Account Created!
          </h2>
          <p className="text-zinc-400 font-light mb-6">
            Your account has been successfully created. Redirecting to login...
          </p>
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 relative overflow-hidden">
      {/* Background Bike Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-zinc-900/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="bg-amber-600 p-3 rounded-xl">
                  <Car className="w-10 h-10 text-zinc-900" />
                </div>
                <span className="text-5xl font-light tracking-wide text-amber-200">
                  RENTRIDE
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-6xl font-light text-white leading-tight tracking-wide">
                  START YOUR JOURNEY
                </h1>
                <div className="h-1 w-24 bg-amber-600"></div>
                <p className="text-xl text-zinc-300 font-light leading-relaxed">
                  Join thousands of satisfied customers and get access to
                  premium vehicles at your fingertips.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-white font-light tracking-wide">
                      INSTANT BOOKING
                    </div>
                    <div className="text-sm text-zinc-400">
                      Book your vehicle in seconds with our streamlined process
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-white font-light tracking-wide">
                      BEST PRICES
                    </div>
                    <div className="text-sm text-zinc-400">
                      Competitive rates with no hidden fees
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-white font-light tracking-wide">
                      24/7 SUPPORT
                    </div>
                    <div className="text-sm text-zinc-400">
                      Our team is always here to help you
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="bg-zinc-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 lg:p-12 border border-amber-600/20">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
              <div className="bg-amber-600 p-2 rounded-lg">
                <Car className="w-6 h-6 text-zinc-900" />
              </div>
              <span className="text-3xl font-light tracking-wide text-amber-200">
                RENTRIDE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-light text-white mb-2 tracking-wide uppercase">
                  Create Account
                </h2>
                <p className="text-zinc-400 font-light">
                  Fill in your details to get started
                </p>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-amber-600 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-amber-600 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 rounded border-zinc-700 bg-zinc-900 text-amber-600 focus:ring-2 focus:ring-amber-600"
                />
                <span className="text-sm text-zinc-400 font-light">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-amber-600 hover:text-amber-500 transition"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-amber-600 hover:text-amber-500 transition"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-zinc-900 py-3 rounded-lg font-light tracking-wide uppercase transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Sign In Link */}
              <p className="text-center text-zinc-400 font-light">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-amber-600 hover:text-amber-500 font-normal transition"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
