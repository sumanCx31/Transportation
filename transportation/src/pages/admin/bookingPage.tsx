"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, XCircle, DollarSign, 
  Eye, QrCode, Bus, Calendar, Search, Filter, RotateCcw
} from "lucide-react";
import authSvc from "../../services/Auth.service";

const BookingsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Filter States
  const [busFilter, setBusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await authSvc.getRequest("/order");
        
        // FIX: Check if your backend wraps data in a 'data' property
        // Common pattern: { success: true, data: [...] }
        const fetchedData = response.data?.data || response.data || [];
        setBookings(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (err) {
        console.error("Failed to fetch SuvYatra bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // --- LOGIC: FILTERING ---
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Adjust these keys based on your actual API response structure
      const busName = b.trip?.bus?.name || b.busNumber || "";
      const travelDate = b.trip?.date || b.createdAt || "";
      
      const matchesBus = busName.toLowerCase().includes(busFilter.toLowerCase());
      const matchesDate = dateFilter ? travelDate.includes(dateFilter) : true;
      
      return matchesBus && matchesDate;
    });
  }, [bookings, busFilter, dateFilter]);

  // --- LOGIC: STATS ---
  const stats = useMemo(() => {
    const total = filteredBookings.length;
    const revenue = filteredBookings.reduce((acc, curr) => acc + (curr.totalAmount || curr.amount || 0), 0);
    const pending = filteredBookings.filter(b => b.status?.toLowerCase() === 'pending').length;
    return { total, revenue, pending };
  }, [filteredBookings]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div className="border border-white/10 rounded-3xl px-6 py-4 bg-slate-900/50">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Suv<span className="text-emerald-500">Yatra</span> Bookings
          </h1>
          <p className="text-slate-400 text-sm">Fleet manifests and order tracking.</p>
        </div>

        {/* --- FILTER SECTION --- */}
        <div className="flex flex-wrap gap-3 bg-slate-900/50 p-3 rounded-3xl border border-white/5">
          <div className="relative">
            <Bus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="Filter by Bus..."
              value={busFilter}
              onChange={(e) => setBusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-950 border border-white/10 rounded-2xl text-xs text-white focus:border-emerald-500 outline-none w-44"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-950 border border-white/10 rounded-2xl text-xs text-white focus:border-emerald-500 outline-none scheme-dark"
            />
          </div>
          <button 
            onClick={() => {setBusFilter(""); setDateFilter("");}}
            className="p-2 hover:bg-white/5 rounded-2xl text-slate-500 transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tickets" value={stats.total.toString()} icon={<Ticket />} color="text-emerald-400" />
        <StatCard title="Revenue" value={`Rs. ${stats.revenue}`} icon={<DollarSign />} color="text-white" />
        <StatCard title="Pending" value={stats.pending.toString()} icon={<XCircle />} color="text-amber-400" />
        <StatCard title="Active Routes" value="14" icon={<Bus />} color="text-blue-400" />
      </div>

      {/* Table Section */}
      <div className="bg-slate-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-500 uppercase text-[10px] tracking-widest font-black">
              <tr>
                <th className="px-6 py-4">Passenger / ID</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Travel Date</th>
                <th className="px-6 py-4">Bus</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-20 text-slate-500 italic">Loading manifests...</td></tr>
              ) : filteredBookings.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-20 text-slate-500 italic">No bookings found.</td></tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-emerald-500/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-bold">{b.user?.name || b.passengerName || "Unknown"}</div>
                      <div className="text-[9px] text-slate-500 font-mono uppercase">{b._id.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-300 text-sm">{b.trip?.from} → {b.trip?.to}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {b.trip?.date || new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-400 font-medium">{b.trip?.bus?.name || b.busNumber}</div>
                      <div className="text-[10px] text-emerald-500 font-bold">{b.trip?.bus?.busNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                        b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setSelectedBooking(b)} className="p-2 bg-slate-900 rounded-xl text-slate-500 hover:text-emerald-500 border border-white/5">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StatCard = ({ title, value, color, icon }: any) => (
  <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
    <div className="absolute right-[-10%] top-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
        {/* {icon && React.cloneElement(icon as React.ReactElement, { size: 80 })} */}
    </div>
    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{title}</p>
    <h3 className={`text-2xl font-black ${color} italic`}>{value}</h3>
  </div>
);

const BookingModal = ({ booking, onClose }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-emerald-500/20 rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-black text-white uppercase italic leading-none">Ticket</h2>
          <p className="text-emerald-500 text-[10px] font-bold tracking-widest uppercase">Boarding Pass</p>
        </div>
        <QrCode className="text-emerald-500" size={40} />
      </div>
      <div className="space-y-4">
        <Detail title="Passenger" val={booking.user?.name || booking.passengerName} />
        <Detail title="Bus" val={booking.trip?.bus?.name || booking.busNumber} />
        <Detail title="Route" val={`${booking.trip?.from} to ${booking.trip?.to}`} />
        <Detail title="Seats" val={booking.seats?.join(", ")} />
        <Detail title="Total Amount" val={`Rs. ${booking.totalAmount || booking.amount}`} />
      </div>
      <button onClick={onClose} className="w-full mt-10 bg-emerald-500 text-slate-900 font-black py-4 rounded-2xl uppercase tracking-tighter italic hover:bg-emerald-400 transition-all active:scale-95">
        Close Manifest
      </button>
    </motion.div>
  </div>
);

const Detail = ({ title, val }: any) => (
  <div className="flex justify-between border-b border-white/5 pb-2">
    <span className="text-[10px] text-slate-500 uppercase font-bold">{title}</span>
    <span className="text-sm font-bold text-white">{val || "N/A"}</span>
  </div>
);

import React from "react";
export default BookingsPage;