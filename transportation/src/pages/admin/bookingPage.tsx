"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, XCircle, DollarSign, 
   Eye,QrCode, Bus 
} from "lucide-react";
import authSvc from "../../services/Auth.service";

const BookingsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Fetching data from your SuvYatra backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await authSvc.getRequest("/bookings");
        setBookings(response.data);
      } catch (err) {
        console.error("Failed to fetch SuvYatra bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <header className="flex justify-between items-center">
        <div className="border border-white/10 rounded-3xl px-6 py-4 bg-slate-900/50">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Suv<span className="text-emerald-500">Yatra</span> Bookings
          </h1>
          <p className="text-slate-400 text-sm">Managing fleet operations & passenger manifests.</p>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tickets" value={bookings.length.toString()} icon={<Ticket />} color="text-emerald-400" />
        <StatCard title="Active Routes" value="14" icon={<Bus />} color="text-blue-400" />
        <StatCard title="Pending" value="08" icon={<XCircle />} color="text-amber-400" />
        <StatCard title="Revenue" value="Rs. 84k" icon={<DollarSign />} color="text-white" />
      </div>

      {/* Table Section */}
      <div className="bg-slate-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-500 uppercase text-[10px] tracking-widest font-black">
            <tr>
              <th className="px-6 py-4">Passenger</th>
              <th className="px-6 py-4">Route</th>
              <th className="px-6 py-4">Bus</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-emerald-500/5 transition-colors">
                <td className="px-6 py-4 text-white font-medium">{b.passengerName}</td>
                <td className="px-6 py-4 text-slate-400">{b.route}</td>
                <td className="px-6 py-4 text-slate-400">{b.busNumber}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setSelectedBooking(b)} className="text-slate-500 hover:text-emerald-500">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* --- Branding Components --- */

const StatCard = ({ title, value,color }: any) => (
  <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{title}</p>
    <h3 className={`text-2xl font-black ${color} italic`}>{value}</h3>
  </div>
);

const BookingModal = ({ booking, onClose }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-emerald-500/20 rounded-3xl w-full max-w-sm p-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-white uppercase italic">Ticket Pass</h2>
        <QrCode className="text-emerald-500" size={32} />
      </div>
      <div className="space-y-4">
        <Detail title="Passenger" val={booking.passengerName} />
        <Detail title="Bus Number" val={booking.busNumber} />
        <Detail title="Route" val={booking.route} />
      </div>
      <button onClick={onClose} className="w-full mt-8 bg-emerald-500 text-slate-900 font-black py-3 rounded-xl uppercase tracking-tighter italic">
        Close
      </button>
    </motion.div>
  </div>
);

const Detail = ({ title, val }: any) => (
  <div className="flex justify-between border-b border-white/5 pb-2">
    <span className="text-[10px] text-slate-500 uppercase">{title}</span>
    <span className="text-sm font-bold text-white">{val}</span>
  </div>
);

export default BookingsPage;