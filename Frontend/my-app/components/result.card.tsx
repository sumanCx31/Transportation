// components/result.card.tsx
import React from 'react';
import Link from 'next/link';

export default function BusResultCard({ bus }: { bus: any }) {
  const availableSeats = bus.seats?.filter((s: any) => !s.isBooked).length || 0;

  return (
    <div className="w-full bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:border-emerald-200 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Info Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-600 font-bold text-sm uppercase">
              {bus.bus?.name || "Standard Bus"}
            </span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-500 text-xs font-mono">{bus.bus?.busNumber}</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 capitalize">
            {bus.from} ➔ {bus.to}
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {bus.departureTime} - {bus.arrivalTime}
          </p>
        </div>

        {/* Action Section */}
        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <p className="text-3xl font-black text-slate-900 mb-1">Rs. {bus.price}</p>
          <p className={`text-xs font-bold mb-4 ${availableSeats > 0 ? "text-emerald-600" : "text-red-500"}`}>
            {availableSeats} seats available
          </p>

          {/* REDIRECTION LINK */}
          <Link 
            href={`/search-bus/${bus._id}/select-seats`}
            className={`block w-full px-8 py-3 rounded-xl font-bold transition-all text-center
              ${availableSeats > 0 
                ? "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            {availableSeats > 0 ? "Select Seats" : "Sold Out"}
          </Link>
        </div>
      </div>
    </div>
  );
}