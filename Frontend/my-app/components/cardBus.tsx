"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Navigation } from "lucide-react";

const buses = [
  {
    id: 1,
    busNumber: "BA-01-1234",
    name: "GreenLine Deluxe",
    route: "Kathmandu → Pokhara",
    seatsAvailable: 12,
    price: "Rs. 1,500",
    departure: "07:00 AM",
    type: "AC Deluxe",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
  },
  {
    id: 2,
    busNumber: "BA-02-5678",
    name: "Swift Holiday",
    route: "Kathmandu → Chitwan",
    seatsAvailable: 3,
    price: "Rs. 1,200",
    departure: "09:30 AM",
    type: "Tourist",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e",
  },
  {
    id: 3,
    busNumber: "BA-03-9999",
    name: "Yatra Premium",
    route: "Butwal → Kathmandu",
    seatsAvailable: 0,
    price: "Rs. 1,800",
    departure: "06:00 AM",
    type: "VIP",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
];

const BusCard = ({ bus }: any) => {
  const isFull = bus.seatsAvailable === 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden shadow-lg bg-white/70 backdrop-blur-md border border-white/20 transition"
    >
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={bus.image}
          alt={bus.name}
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

        {/* BUS TYPE BADGE */}
        <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {bus.type}
        </span>

        {/* BUS NAME ON IMAGE */}
        <div className="absolute bottom-3 left-4 text-white">
          <h2 className="text-lg font-bold">{bus.name}</h2>
          <p className="text-xs opacity-80">{bus.busNumber}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* ROUTE */}
        <div className="flex items-center gap-2 text-gray-600">
          <Navigation size={16} />
          <span className="text-sm">{bus.route}</span>
        </div>

        {/* INFO */}
        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p className="text-gray-400">Departure</p>
            <p className="font-semibold">{bus.departure}</p>
          </div>

          <div>
            <p className="text-gray-400">Price</p>
            <p className="font-bold text-blue-600">{bus.price}</p>
          </div>
        </div>

        {/* SEATS */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span
              className={`text-sm font-semibold ${
                isFull
                  ? "text-red-500"
                  : bus.seatsAvailable < 5
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {isFull
                ? "Sold Out"
                : bus.seatsAvailable < 5
                ? `Only ${bus.seatsAvailable}`
                : `${bus.seatsAvailable} seats`}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={isFull}
          className={`w-full mt-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            isFull
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md"
          }`}
        >
          {isFull ? "Unavailable" : "View Seats"}
        </button>
      </div>
    </motion.div>
  );
};

export default function BusSearchPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 p-6 mt-20">
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-gray-800"
      >
        🚌 Find Your Bus
      </motion.h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {buses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </div>
  );
}