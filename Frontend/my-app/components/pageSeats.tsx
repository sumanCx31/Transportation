"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Armchair, ShipWheel, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  // --- LOGIC: BOOKING HANDLER ---
  const handleProceed = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    setLoading(true);

    try {
      /**
       * STEP 1: Create the Order in your Database
       * Route: POST http://localhost:9005/api/v1/order
       */
      const payload = {
        user: "69b3e1981b2b62c1fff48fc7", // Replace with real User ID from your Auth Store
        trip: initialData._id,
        seats: selectedSeats,
        paymentMethod: "khalti",
      };

      const response = await axios.post(
        "http://localhost:9005/api/v1/order",
        payload
      );

      // Check if order was created successfully
      if (response.data?.data?._id) {
        const orderId = response.data.data._id;
        toast.success("Order created! Navigating to checkout...");

        /**
         * STEP 2: Redirect to Frontend Checkout Page
         * We don't hit the /payment/ initiation route yet. 
         * That happens on the Checkout page when they click "Pay Now".
         */
        router.push(`/checkout/${orderId}?method=khalti`);
      }
    } catch (error: any) {
      console.error("Booking Error:", error);
      const msg = error.response?.data?.message || "Something went wrong during booking.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const checkIsBooked = (seatNo: string) => {
    const seat = initialData.seats.find((s) => s.seatNumber === seatNo);
    return seat ? seat.isBooked : true;
  };

  // Internal Seat Component for cleaner rendering
  const Seat = ({ id }: { id: string }) => {
    const isBooked = checkIsBooked(id);
    const isSelected = selectedSeats.includes(id);

    return (
      <button
        disabled={isBooked || loading}
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
        <span
          className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold px-1.5 rounded-full border shadow-sm
          ${
            isSelected
              ? "bg-emerald-600 text-white border-emerald-700"
              : "bg-white text-slate-500 border-slate-200"
          }`}
        >
          {id}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row pt-24 pb-12 bg-[#F8FAFC] p-4 md:px-10 gap-8 justify-center items-start">
      
      {/* BUS LAYOUT VISUALIZER */}
      <div className="w-full max-w-[420px] bg-white rounded-[40px] shadow-2xl border-[12px] border-slate-50 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-dashed border-slate-200">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft size={14} /> Back to results
          </button>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center opacity-30">
              <ShipWheel size={32} className="text-slate-900" />
              <span className="text-[9px] font-black mt-1 uppercase tracking-widest">Pilot</span>
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
            {/* Map 8 rows for a standard 32-seater layout */}
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

      {/* TICKET SUMMARY SIDEBAR */}
      <div className="w-full max-w-[400px] sticky top-28">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
            SUV <span className="text-emerald-500 font-medium italic">Yatra</span>
          </h2>
          <div className="mt-2 mb-8 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              {initialData.from}
            </span>
            <span className="text-slate-300">➔</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              {initialData.to}
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-dashed border-slate-100 pb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Selected Seats
                </span>
                <div className="flex gap-1 flex-wrap mt-2">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((s) => (
                      <span
                        key={s}
                        className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded border border-emerald-100"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-300 text-xs italic">
                      Pick your seats on the map
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Total Fare
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Rs. {(selectedSeats.length * initialData.price).toLocaleString()}
              </h3>
            </div>

            <button
              onClick={handleProceed}
              disabled={selectedSeats.length === 0 || loading}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  PROCEED TO CHECKOUT
                  <CheckCircle2 size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="pt-2 flex flex-col items-center gap-1">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Departure: {initialData.departureTime}
              </p>
              <div className="w-10 h-1 bg-slate-100 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSeat;