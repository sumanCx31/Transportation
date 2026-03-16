// components/BusResultCard.tsx
import React from 'react';

export default function BusResultCard({ bus }: { bus: any }) {
  // Logic: Calculate available seats (if any)
  const availableSeats = bus.seats?.filter((s: any) => !s.isBooked).length || 0;

  return (
    <div className="w-full bg-white p-6 rounded-3xl border border-slate-100 shadow-md mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Bus and Route Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-600 font-bold text-sm uppercase">
              {bus.bus.name} {/* Accessing the new populated name */}
            </span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-500 text-xs font-mono">
              {bus.bus.busNumber} {/* Accessing the new bus number */}
            </span>
          </div>
          
          <h3 className="text-2xl font-black text-slate-900">
            {bus.from} ➔ {bus.to}
          </h3>
          
          <div className="flex gap-4 mt-2 text-sm text-slate-500">
            <span>Dep: <strong className="text-slate-900">{bus.departureTime}</strong></span>
            <span>Arr: <strong className="text-slate-900">{bus.arrivalTime}</strong></span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <div className="flex flex-col items-center md:items-end gap-3 min-w-37.5">
          <div className="text-right">
            <p className="text-3xl font-black text-slate-900">
              Rs. {bus.price}
            </p>
            <p
              className={`text-xs font-bold ${availableSeats > 0 ? "text-emerald-600" : "text-red-500"}`}
            >
              {availableSeats} seats available
            </p>
          </div>

          <button
            disabled={availableSeats === 0}
            className="w-full h-12 px-6 bg-slate-900 text-white font-bold rounded-xl 
                       hover:bg-green-500 disabled:bg-gray-300 transition-colors"
          >
            {availableSeats > 0 ? "Select Seats" : "Sold Out"}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

        
 
