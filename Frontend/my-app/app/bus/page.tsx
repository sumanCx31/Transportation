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
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition"
    >
      {/* IMAGE */}
      <div className="h-40 overflow-hidden">
        <img
          src={bus.image}
          alt={bus.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-lg font-bold">{bus.name}</h2>
        <p className="text-sm text-gray-500">{bus.busNumber}</p>

        {/* ROUTE */}
        <div className="flex items-center gap-2 mt-3 text-gray-600">
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
            <p className="text-gray-400">Type</p>
            <p className="font-semibold">{bus.type}</p>
          </div>
        </div>

        {/* SEATS */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span
              className={`font-semibold ${
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

          <p className="font-bold text-blue-600">{bus.price}</p>
        </div>

        {/* BUTTON */}
        <button
          disabled={isFull}
          className={`w-full mt-5 py-2 rounded-lg font-semibold transition ${
            isFull
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Buses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </div>
  );
}