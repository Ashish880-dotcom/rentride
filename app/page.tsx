'use client';

import React, { useState } from 'react';
import { Car, Shield, Clock, Star, ChevronRight, Menu, X, Calendar, MapPin, Search } from 'lucide-react';

export default function RentRideLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'Electric Sedan',
      price: 89,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
      rating: 4.9,
      seats: 5,
      transmission: 'Auto'
    },
    {
      id: 2,
      name: 'BMW X5',
      type: 'Luxury SUV',
      price: 129,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      rating: 4.8,
      seats: 7,
      transmission: 'Auto'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RentRide
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#vehicles" className="text-slate-700 hover:text-blue-600 transition font-medium">
                Vehicles
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
              Rent Your Dream
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vehicle Today
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience premium vehicle rentals with instant booking, flexible pricing, and 24/7 support.
            </p>
          </div>
        </div>
      </div>

      <div id="vehicles" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Vehicles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-slate-200">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">{vehicle.name}</h3>
                  <p className="text-sm text-slate-500">{vehicle.type}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-slate-900">/day</span>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
