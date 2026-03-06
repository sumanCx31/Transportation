"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Calendar, Search, ArrowRightLeft, Sparkles } from "lucide-react";

const cities = [
  "Kathmandu", "Pokhara", "Biratnagar", "Chitwan", "Butwal", "Dharan",
  "Janakpur", "Hetauda", "Dhangadhi", "Kapilvastu", "Itahari",
  "Lalitpur", "Bhairawa", "Nepalgunj", "Bharatpur", "Rajbiraj", "Birgunj",
];

const ProfessionalSearch = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const swapLocations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  return (
    <div className="w-full py-20 px-6 flex justify-center relative overflow-hidden bg-transparent">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full max-w-6xl relative group"
      >
        {/* CRAZY ANIMATED BORDER GRADIENT */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-[2.5rem] opacity-30 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

        <div className="relative flex flex-col lg:flex-row items-stretch gap-2 p-4 bg-[#0f172a]/80 backdrop-blur-3xl rounded-[2.3rem] border border-white/10 shadow-2xl">
          
          {/* FROM SECTION */}
          <div className="flex-1 relative group/input">
            <div className="h-full px-8 py-4 rounded-3xl transition-colors group-hover/input:bg-white/5">
              <label className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">
                <MapPin size={14} className="animate-pulse" /> Origin
              </label>
              <select
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full bg-transparent text-white text-xl font-bold outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-white/40">Where from?</option>
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-slate-900 text-white">{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SWAP BUTTON */}
          <div className="hidden lg:flex items-center justify-center -mx-4 z-10">
            <motion.button
              whileHover={{ rotate: 180, scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={swapLocations}
              className="p-3 bg-slate-800 border border-white/10 rounded-full text-blue-400 shadow-xl backdrop-blur-md hover:border-blue-500/50 transition-colors"
            >
              <ArrowRightLeft size={20} />
            </motion.button>
          </div>

          {/* TO SECTION */}
          <div className="flex-1 relative group/input">
            <div className="h-full px-8 py-4 rounded-3xl transition-colors group-hover/input:bg-white/5">
              <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">
                <Navigation size={14} /> Destination
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full bg-transparent text-white text-xl font-bold outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-white/40">Going where?</option>
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-slate-900 text-white">{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* DATE SECTION */}
          <div className="flex-1 relative group/input border-t lg:border-t-0 lg:border-l border-white/5">
            <div className="h-full px-8 py-4 rounded-3xl transition-colors group-hover/input:bg-white/5">
              <label className="flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">
                <Calendar size={14} /> Departure
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent text-white text-xl font-bold outline-none [color-scheme:dark] cursor-pointer"
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="flex items-center p-1">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden w-full lg:w-auto h-full lg:h-20 px-10 bg-blue-600 rounded-[1.8rem] flex items-center justify-center gap-4 group/btn"
            >
              {/* Shine Effect */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg]"
              />
              
              <div className="relative flex items-center gap-3">
                <Search size={24} strokeWidth={3} className="text-white" />
                <span className="text-white font-black text-lg tracking-widest">FIND BUS</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* FLOATING BADGE */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-blue-400/60 text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap"
            >
              <Sparkles size={12} />
              Hyper-speed search enabled
              <Sparkles size={12} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfessionalSearch;