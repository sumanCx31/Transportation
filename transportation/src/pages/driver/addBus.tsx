'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Calendar, DollarSign, Activity, Save, Loader2 } from 'lucide-react';

interface TripFormProps {
  busId?: string; // Pass this from the parent component
}

const SuvYatraTripForm = ({ busId = '69b3b0ee55bf6c436609f7a5' }: TripFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bus: busId,
    from: '',
    to: '',
    price: '',
    status: 'scheduled',
    departureTime: '',
    arrivalTime: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9005/api/v1/trip-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('SuvYatra trip updated successfully!');
      } else {
        alert('Failed to update trip. Please check your network.');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
      {/* Header section */}
      <div className="bg-emerald-500 p-8">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-2">
          <Save className="w-6 h-6" /> Update Trip Manifest
        </h2>
        <p className="text-slate-900/70 font-medium">Bus ID: {busId.slice(-8)}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Route Section */}
        <div className="space-y-2">
          <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest">
            <MapPin size={14} /> Origin City
          </label>
          <input 
            type="text" name="from" value={formData.from} onChange={handleChange} 
            className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all"
            placeholder="e.g. Kathmandu" required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest">
            <MapPin size={14} /> Destination
          </label>
          <input 
            type="text" name="to" value={formData.to} onChange={handleChange} 
            className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all"
            placeholder="e.g. Pokhara" required 
          />
        </div>

        {/* Pricing & Status */}
        <div className="space-y-2">
          <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest">
            <DollarSign size={14} /> Ticket Price (NPR)
          </label>
          <input 
            type="number" name="price" value={formData.price} onChange={handleChange} 
            className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all"
            placeholder="1500" required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest">
            <Activity size={14} /> Journey Status
          </label>
          <select 
            name="status" value={formData.status} onChange={handleChange} 
            className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all appearance-none"
          >
            <option value="scheduled">Scheduled</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Schedule */}
        <div className="space-y-2">
          <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest">
            <Clock size={14} /> Departure
          </label>
          <input 
            type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} 
            className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all"
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest">
            <Clock size={14} /> Arrival
          </label>
          <input 
            type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} 
            className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all"
            required 
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest">
            <Calendar size={14} /> Journey Date
          </label>
          <input 
            type="date" name="date" value={formData.date} onChange={handleChange} 
            className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all"
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="md:col-span-2 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
          {loading ? 'Processing...' : 'Sync Trip to Database'}
        </button>
      </form>
    </div>
  );
};

export default SuvYatraTripForm;