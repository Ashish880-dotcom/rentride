import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Calculate days between two dates
 */
export function calculateDays(
  startDate: Date | string,
  endDate: Date | string,
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate rental price
 */
export function calculateRentalPrice(
  pricePerDay: number,
  startDate: Date | string,
  endDate: Date | string,
): {
  days: number;
  subtotal: number;
  serviceFee: number;
  total: number;
} {
  const days = calculateDays(startDate, endDate);
  const subtotal = pricePerDay * days;
  const serviceFee = 10; // Fixed service fee
  const total = subtotal + serviceFee;

  return {
    days,
    subtotal,
    serviceFee,
    total,
  };
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Sleep utility for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if dates overlap
 */
export function datesOverlap(
  start1: Date | string,
  end1: Date | string,
  start2: Date | string,
  end2: Date | string,
): boolean {
  const s1 = new Date(start1).getTime();
  const e1 = new Date(end1).getTime();
  const s2 = new Date(start2).getTime();
  const e2 = new Date(end2).getTime();

  return s1 <= e2 && s2 <= e1;
}

/**
 * Get booking status color (Coffee theme)
 */
export function getStatusColor(status: string): string {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return "bg-green-900/20 text-green-400 border-green-800";
    case "PENDING":
      return "bg-amber-900/20 text-amber-400 border-amber-800";
    case "COMPLETED":
      return "bg-blue-900/20 text-blue-400 border-blue-800";
    case "CANCELLED":
      return "bg-red-900/20 text-red-400 border-red-800";
    default:
      return "bg-zinc-700 text-zinc-300 border-zinc-600";
  }
}

/**
 * Get vehicle status color (Coffee theme)
 */
export function getVehicleStatusColor(status: string): string {
  switch (status.toUpperCase()) {
    case "AVAILABLE":
      return "bg-green-900/80 text-green-300 border-green-800";
    case "RENTED":
      return "bg-orange-900/80 text-orange-300 border-orange-800";
    case "MAINTENANCE":
      return "bg-red-900/80 text-red-300 border-red-800";
    default:
      return "bg-zinc-700 text-zinc-300 border-zinc-600";
  }
}

/**
 * Format vehicle type
 */
export function formatVehicleType(type: string): string {
  const types: Record<string, string> = {
    CAR: "Car",
    MOTORCYCLE: "Motorcycle",
    BIKE: "Bike",
    SCOOTER: "Scooter",
    VAN: "Van",
    TRUCK: "Truck",
  };
  return types[type.toUpperCase()] || type;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  return new Date(date) < new Date();
}

/**
 * Check if date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  return new Date(date) > new Date();
}

/**
 * Get date range string
 */
export function getDateRangeString(
  startDate: Date | string,
  endDate: Date | string,
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

/**
 * Parse query string
 */
export function parseQueryString(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/**
 * Build query string
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Get error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
}
