import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, CheckCircle, XCircle, DollarSign,Bell, 
  Search, Filter, Eye,  Trash2, 
  Download, QrCode, ArrowRight 
} from "lucide-react";

const BookingsPage = () => {
    const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    > 
        {/* Bookings Header */}
        
        <header className="flex justify-between items-center mb-10">
          <div className="border border-white/10 rounded-3xl px-6 py-4 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-white">
              Bookings
            </h1>
            <p className="text-slate-400">
                Manage and review all bus bookings in one place.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button className="relative p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full" />
            </button>
          </div>
        </header>
      {/* 1. Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Bookings" value="1,284" icon={<Ticket />} color="text-blue-400" />
        <StatCard title="Today's Bookings" value="42" icon={<CheckCircle />} color="text-emerald-400" />
        <StatCard title="Cancelled" value="12" icon={<XCircle />} color="text-rose-400" />
        <StatCard title="Revenue (Today)" value="$1,420" icon={<DollarSign />} color="text-amber-400" />
      </div>

      {/* 2. Filters & Controls */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, Name, or Phone..." 
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
          <select className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-emerald-500">
            <option>All Routes</option>
            <option>Kathmandu → Pokhara</option>
          </select>
          <input type="date" className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none" />
          <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-xl py-2.5 transition-all flex items-center justify-center gap-2">
            <Filter size={18} /> Apply Filters
          </button>
        </div>
      </section>

      {/* 3. Booking Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Passenger</th>
              <th className="px-6 py-4 font-medium">Route / Bus</th>
              <th className="px-6 py-4 font-medium">Seat</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Payment</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.tr 
                key={item} 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                className="group transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-white">Rohan Sharma</div>
                  <div className="text-xs text-slate-500">ID: #BK-990{item}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    KTM <ArrowRight size={12} className="text-emerald-500" /> PKR
                  </div>
                  <div className="text-xs text-slate-500">Sajha Yatayat (BA 2 PA 123)</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold">A1 (Fixed)</span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Confirmed
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-slate-800 text-slate-300 border border-white/10">Paid</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ActionButton icon={<Eye size={16} />} onClick={() => setSelectedBooking(item)} />
                    <ActionButton icon={<Download size={16} />} />
                    <ActionButton icon={<Trash2 size={16} />} variant="danger" />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <BookingModal id={selectedBooking} onClose={() => setSelectedBooking(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* --- Sub-Components --- */

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
    <div>
      <p className="text-slate-400 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
  </div>
);

const ActionButton = ({ icon, onClick, variant = "default" }: any) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-lg border border-white/10 transition-colors ${
      variant === "danger" ? "hover:bg-rose-500/20 text-rose-400" : "hover:bg-white/10 text-slate-400 hover:text-white"
    }`}
  >
    {icon}
  </button>
);

const BookingModal = ({ id, onClose }: any) => (
   
    <>
    
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
    />
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden z-10 shadow-2xl"
    >
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Booking Details</h2>
            <p className="text-slate-400 text-sm">Ticket ID: #SUV-99201-44</p>
          </div>
          <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl">
            <QrCode size={32} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <DetailGroup label="Passenger" value="Rohan Sharma" sub="+977 9801234567" />
          <DetailGroup label="Travel Date" value="Oct 24, 2023" sub="08:30 AM Departure" />
          <DetailGroup label="Bus & Seat" value="Sajha Deluxe" sub="Seat: A1 (Window)" />
          <DetailGroup label="Route" value="Kathmandu (KTM)" sub="To: Pokhara (PKR)" />
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-dashed border-white/20">
            <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Base Fare</span>
                <span className="text-white font-medium">$25.00</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tax & Fees</span>
                <span className="text-white font-medium">$2.50</span>
            </div>
            <div className="h-px bg-white/10 my-3" />
            <div className="flex justify-between font-bold text-lg text-emerald-400">
                <span>Total Amount</span>
                <span>$27.50</span>
            </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10"
        >
          Close Preview
        </button>
      </div>
    </motion.div>
  </div>
    </>
);

const DetailGroup = ({ label, value, sub }: any) => (
  <div>
    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-white font-medium">{value}</p>
    <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
  </div>
);

export default BookingsPage;