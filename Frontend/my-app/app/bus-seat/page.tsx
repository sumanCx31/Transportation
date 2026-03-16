"use client";

import React, { useState } from "react";
import { Armchair, ShipWheel } from "lucide-react";

const PageSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const pricePerSeat = 1600;

  // Configuration for 38 seats
  // 9 rows of 4 (36 seats) + 2 seats at the very back
  const rows = 8;

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const Seat = ({
    id,
    isBooked = false,
  }: {
    id: string;
    isBooked?: boolean;
  }) => {
    const isSelected = selectedSeats.includes(id);
    return (
      <button
        disabled={isBooked}
        onClick={() => toggleSeat(id)}
        className={`relative w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all
          ${
            isBooked
              ? "bg-gray-200 border-gray-300 cursor-not-allowed opacity-50"
              : isSelected
                ? "bg-emerald-500 border-emerald-600 text-white shadow-lg"
                : "bg-white border-slate-200 hover:border-slate-400 text-slate-600"
          }`}
      >
        <Armchair size={20} />
        <span className="absolute -top-1 -left-1 text-[8px] font-bold bg-white text-slate-900 border px-1 rounded">
          {id}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col  lg:flex-row mt-12 gap-10 w-full justify-center items-start min-h-screen bg-gray-50 p-6">
      {/* LEFT: THE BUS BODY */}
      <div className="bg-white border-10 border-slate-200 rounded-[3rem] p-8 shadow-2xl w-full max-w-sm">
        {/* Front Area (Driver) */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b-2 border-dashed">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <ShipWheel size={24} />
          </div>
          <div className="text-xs font-black text-slate-300 uppercase tracking-widest">
            Entry Door
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-8 uppercase">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white border border-slate-200 rounded" />{" "}
            Available
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500 rounded" /> Selected
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded" /> Booked
          </div>
        </div>

        {/* The Grid: 9 Rows of 4 */}
        <div className="space-y-4">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
                
              {/* Left Column (A & B) */}
              <div className="flex gap-2">
                <Seat id={`A${i + 1}`} isBooked={i === 5} />
                <Seat id={`B${i + 1}`} />
              </div>

              {/* Aisle (Walking Space) */}
              <div className="text-[10px] text-slate-300 font-bold">
                {i + 1}
              </div>

              {/* Right Column (C & D) */}
              <div className="flex gap-2">
                <Seat id={`C${i + 1}`} isBooked={i === 5} />
                <Seat id={`D${i + 1}`} />
              </div>
            </div>
          ))}

       
          {/* Back Row (Remaining 2 seats) */}
          <div className="flex justify-center gap-3 pt-4 border-t border-slate-100">
            <Seat id="E1" />
            <Seat id="E2" />
            <Seat id="E3" />
            <Seat id="E4" />
            <Seat id="E5" />
          </div>
        </div>
      </div>

      {/* RIGHT: BOOKING SUMMARY */}
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-10">
        <h2 className="text-2xl font-black text-slate-900 mb-6">
          Booking Details
        </h2>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Seats Selected:</span>
            <span className="text-slate-900 font-bold">
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
            </span>
          </div>
          <div className="flex justify-between text-xl font-black text-slate-900 border-t pt-4">
            <span>Total Amount:</span>
            <span>Rs. {selectedSeats.length * pricePerSeat}</span>
          </div>
        </div>

        <button
          disabled={selectedSeats.length === 0}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all disabled:bg-slate-200 disabled:text-slate-400"
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default PageSeat;
