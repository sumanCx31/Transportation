"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Armchair, ShipWheel, CheckCircle2, Info, ArrowLeft } from "lucide-react";

interface PageSeatProps {
  initialData: {
    _id: string;
    from: string;
    to: string;
    price: number;
    departureTime: string;
    bus: {
      name: string;
      busNumber: string;
    };
    seats: Array<{
      seatNumber: string;
      isBooked: boolean;
      _id: string;
    }>;
  };
}

const PageSeat: React.FC<PageSeatProps> = ({ initialData }) => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Direct boolean check from your response
  const checkIsBooked = (seatNo: string) => {
    const seat = initialData.seats.find((s) => s.seatNumber === seatNo);
    return seat ? seat.isBooked : true; // Default to true (disabled) if seat not found
  };

  const Seat = ({ id }: { id: string }) => {
    const isBooked = checkIsBooked(id);
    const isSelected = selectedSeats.includes(id);

    return (
      <button
        disabled={isBooked}
        onClick={() => toggleSeat(id)}
        className={`group relative w-12 h-14 rounded-t-xl rounded-b-md border-b-4 flex items-center justify-center transition-all active:scale-95
          ${
            isBooked
              ? "bg-slate-100 border-slate-200 cursor-not-allowed opacity-40"
              : isSelected
              ? "bg-emerald-500 border-emerald-700 text-white shadow-lg -translate-y-1"
              : "bg-white border-slate-200 hover:border-emerald-400 hover:text-emerald-600 text-slate-400"
          }`}
      >
        <Armchair size={22} fill={isSelected ? "currentColor" : "none"} />
        <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold px-1.5 rounded-full border shadow-sm
          ${isSelected ? "bg-emerald-600 text-white border-emerald-700" : "bg-white text-slate-500 border-slate-200"}`}>
          {id}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row pt-24 pb-12 bg-[#F8FAFC] p-4 md:px-10 gap-8 justify-center items-start">
      
      {/* BUS LAYOUT */}
      <div className="w-full max-w-[420px] bg-white rounded-[40px] shadow-2xl border-[12px] border-slate-50 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-dashed border-slate-200">
          <button onClick={() => router.back()} className="mb-4 flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase hover:text-emerald-500 transition-colors">
            <ArrowLeft size={14} /> Back to results
          </button>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center opacity-30">
              <ShipWheel size={32} className="text-slate-900" />
              <span className="text-[9px] font-black mt-1 uppercase">Pilot</span>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                {initialData.bus.busNumber}
              </div>
              <div className="text-sm font-black text-slate-900 leading-tight">
                {initialData.bus.name}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-5">
            {/* Generating 8 rows to match your 32-seat array */}
            {[...Array(8)].map((_, i) => {
              const row = i + 1;
              return (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex gap-4">
                    <Seat id={`A${row}1`} />
                    <Seat id={`A${row}2`} />
                  </div>
                  
                  <span className="text-[10px] font-black text-slate-200">{row}</span>

                  <div className="flex gap-4">
                    <Seat id={`B${row}1`} />
                    <Seat id={`B${row}2`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUMMARY SIDEBAR */}
      <div className="w-full max-w-[400px] sticky top-28">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 uppercase">SUV <span className="text-emerald-500 font-medium italic">Yatra</span></h2>
          <div className="mt-2 mb-8 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">{initialData.from}</span>
            <span className="text-slate-300">➔</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">{initialData.to}</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-dashed pb-6">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Seats</span>
                    <div className="flex gap-1 flex-wrap mt-2">
                        {selectedSeats.length > 0 ? selectedSeats.map(s => (
                            <span key={s} className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded border border-emerald-100">
                                {s}
                            </span>
                        )) : <span className="text-slate-300 text-xs italic">Select seats on the map</span>}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Payable</span>
                <h3 className="text-2xl font-black text-slate-900">
                    Rs. {(selectedSeats.length * initialData.price).toLocaleString()}
                </h3>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all flex items-center justify-center gap-2"
            >
              Continue to Payment
              <CheckCircle2 size={20} />
            </button>
            
            <p className="text-[10px] text-center text-slate-400 font-medium">
                Departure Time: {initialData.departureTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSeat;