"use client";

import React, { useState } from "react";
import {
  Car,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Shield,
  Zap,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 relative overflow-hidden">
      {/* Background Car Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-zinc-900/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
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
                  WELCOME BACK
                </h1>
                <div className="h-1 w-24 bg-amber-600"></div>
                <p className="text-xl text-zinc-300 font-light leading-relaxed">
                  Access your premium vehicle collection and manage your
                  bookings with ease.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-white font-light tracking-wide">
                      SECURE PLATFORM
                    </div>
                    <div className="text-sm text-zinc-400">
                      Your data is protected with enterprise-grade security
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-white font-light tracking-wide">
                      INSTANT BOOKING
                    </div>
                    <div className="text-sm text-zinc-400">
                      Book your dream vehicle in seconds
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-600/20 rounded-xl p-6">
                  <div className="text-4xl font-light text-amber-600 mb-2">
                    500+
                  </div>
                  <div className="text-zinc-300 font-light tracking-wide uppercase text-sm">
                    Premium Vehicles
                  </div>
                </div>
                <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-600/20 rounded-xl p-6">
                  <div className="text-4xl font-light text-amber-600 mb-2">
                    10K+
                  </div>
                  <div className="text-zinc-300 font-light tracking-wide uppercase text-sm">
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-light text-white mb-2 tracking-wide uppercase">
                  Sign In
                </h2>
                <p className="text-zinc-400 font-light">
                  Enter your credentials to continue
                </p>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                  Email Address
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

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-light text-zinc-300 uppercase tracking-wide">
                  Password
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-amber-600 focus:ring-2 focus:ring-amber-600"
                  />
                  <span className="text-sm text-zinc-400 font-light">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-amber-600 hover:text-amber-500 font-light transition"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-zinc-900 py-3 rounded-lg font-light tracking-wide uppercase transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-zinc-800 text-zinc-500 font-light">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full border border-zinc-700 hover:border-amber-600 text-white py-3 rounded-lg font-light tracking-wide transition flex items-center justify-center gap-3 hover:bg-zinc-900/50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-zinc-400 font-light">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-amber-600 hover:text-amber-500 font-normal transition"
                >
                  Sign up for free
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
