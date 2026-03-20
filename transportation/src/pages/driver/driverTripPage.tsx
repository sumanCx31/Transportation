"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import authSvc from "../../services/Auth.service";
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Loader2, 
  ChevronLeft,
  Banknote,
  Plus,
  Edit3,
  Bus,
  AlertTriangle,
  Search,
  LayoutGrid
} from "lucide-react";

const DriverTripPage = () => {
  const { busId } = useParams(); 
  const navigate = useNavigate();
  
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("");

  const fetchTripsByBus = useCallback(async () => {
    if (!busId) {
      setError("No Bus ID provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await authSvc.getRequest(`/trip-update/bus/${busId}`);
      const tripData = response.data?.data || response.data || [];
      setAllTrips(tripData);
    } catch (err: any) {
      console.error("Trip fetch error:", err);
      setError("Connection failed. Please check your network.");
    } finally {
      setLoading(false);
    }
  }, [busId]);

  useEffect(() => {
    fetchTripsByBus();
  }, [fetchTripsByBus]);

  // Instant local filtering based on the date input
  const filteredTrips = useMemo(() => {
    if (!dateFilter) return allTrips;
    return allTrips.filter(trip => {
      const tripDate = new Date(trip.date).toISOString().split('T')[0];
      return tripDate === dateFilter;
    });
  }, [dateFilter, allTrips]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-emerald-500">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="font-black uppercase tracking-widest text-[10px] italic text-slate-500">Syncing Manifests...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-500 space-y-4">
      <AlertTriangle size={48} />
      <p className="font-bold uppercase tracking-widest text-sm">{error}</p>
      <button onClick={fetchTripsByBus} className="px-6 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-black uppercase">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6 bg-slate-900 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/admin/driver-bus")}
              className="p-3 rounded-2xl bg-slate-800 border border-white/5 text-slate-400 hover:text-emerald-500 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                Trip <span className="text-emerald-500">Schedules</span>
              </h1>
              {allTrips.length > 0 && allTrips[0]?.bus && (
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  Vehicle: {allTrips[0].bus.name}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* DATE SEARCH INPUT */}
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-white transition-colors" size={16} />
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-slate-800 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-xs font-bold focus:outline-none focus:border-emerald-500 transition-all uppercase"
              />
              {dateFilter && (
                <button 
                  onClick={() => setDateFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-[10px] font-black"
                >
                  CLEAR
                </button>
              )}
            </div>

            <button 
              onClick={() => navigate(`/driver/add-trip/${busId}`)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus size={18} /> Add Trip
            </button>
          </div>
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTrips.map((trip) => (
            <TripSummaryCard 
              key={trip._id} 
              trip={trip} 
              onEdit={() => navigate(`/admin/trip/edit/${trip._id}`)}
              onManifest={() => navigate(`/admin/manifest/${trip._id}`)}
              onViewSeats={() => navigate(`/admin/trip/seats/${trip._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900 rounded-[3rem] border border-dashed border-white/10">
          {dateFilter ? <Search className="mx-auto text-slate-800 mb-4 opacity-20" size={48} /> : <Bus className="mx-auto text-slate-800 mb-4 opacity-20" size={48} />}
          <p className="text-slate-500 font-bold italic uppercase tracking-widest">
            {dateFilter ? "No trips found for this date." : "No trips found for this bus."}
          </p>
        </div>
      )}
    </div>
  );
};

/* --- Updated Trip Summary Card --- */
const TripSummaryCard = ({ trip, onEdit, onManifest, onViewSeats }: any) => {
  const bookedCount = trip.seats?.filter((s: any) => s.isBooked).length || 0;
  const totalSeats = trip.seats?.length || 0;

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-10 h-1 w-24 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Dep</p>
              <p className="text-xl font-black text-white italic">{trip.departureTime}</p>
            </div>
            <ArrowRight className="text-emerald-500/50" size={16} />
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Arr</p>
              <p className="text-xl font-black text-white italic">{trip.arrivalTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onEdit} className="p-2 bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors border border-white/5">
              <Edit3 size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
          <MapPin className="text-emerald-500 shrink-0" size={18} />
          <p className="text-md font-black text-white uppercase italic tracking-tight">
            {trip.from} <span className="text-slate-600 px-1 font-normal text-xs not-italic">to</span> {trip.to}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2">
            <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 mb-1">Date</span>
                <p className="text-white font-bold text-xs truncate">{new Date(trip.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 mb-1">Load</span>
                <p className="text-white font-bold text-xs">{bookedCount}/{totalSeats}</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 mb-1">Fare</span>
                <p className="text-emerald-500 font-black text-xs">Rs.{trip.price}</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onManifest}
            className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-black rounded-2xl uppercase text-[10px] tracking-[0.2em] transition-all border border-white/5"
          >
            Manifest
          </button>
          <button 
            onClick={onViewSeats}
            className="flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-2xl uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg shadow-emerald-500/10"
          >
            <LayoutGrid size={14} /> View Seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverTripPage;