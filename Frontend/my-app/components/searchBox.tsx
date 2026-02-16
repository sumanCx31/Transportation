"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Calendar, Search } from 'lucide-react';
import { set } from 'mongoose';
import { log } from 'console';



const ProfessionalSearch = () => {
  const [origin, setOrigin] = React.useState({
    origin: "",
    destination: "",
  });
  
  const handleChange = (e: React.SyntheticEvent) =>{
  setOrigin({
    ...origin,
    [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    
  });
  console.log(origin,"origin");
  

  
  }
  return (
    /* This outer div ensures the component has space and contrast */
    <div className="w-full p-10 bg-gray-50 flex justify-center"> 
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl relative flex flex-col lg:flex-row items-center gap-2 p-3 
                   /* This tint makes it visible on white backgrounds */
                   bg-slate-900/60 backdrop-blur-2xl border border-white/20 
                   rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        {/* FROM FIELD */}
        <div className="w-full flex-1 px-6 py-3 border-r border-white/10 group">
          <label className="flex items-center gap-2 text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">
            <MapPin size={14} /> From
          </label>
          <input 
            type="text" 
            id="origin"
            name='origin'
            placeholder="Origin City" 
            className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-white/30 focus:ring-0"
            onChange={handleChange}
          />
        </div>

        {/* TO FIELD */}
        <div className="w-full flex-1 px-6 py-3 border-r border-white/10 group">
          <label className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <Navigation size={14} /> To
          </label>
          <input 
            type="text" 
            placeholder="Destination" 
            name='destination'
            id="destination"
            onChange={handleChange}
            className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-white/30 focus:ring-0"
          />
        </div>

        {/* DATE FIELD */}
        <div className="w-full flex-1 px-6 py-3 group">
          <label className="flex items-center gap-2 text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-1">
            <Calendar size={14} /> Date
          </label>
          {/* Note: [color-scheme:dark] makes the calendar icon white */}
          <input 
            type="date" 
            className="w-full bg-transparent border-none outline-none text-white text-lg [color-scheme:dark] cursor-pointer focus:ring-0"
          />
        </div>

        {/* SEARCH BUTTON */}
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
          whileTap={{ scale: 0.95 }}
          className="w-full lg:w-auto h-[64px] px-12 bg-white text-slate-900 font-black rounded-2xl 
                     transition-all duration-300 shadow-xl flex items-center justify-center gap-3 hover:text-white"
        >
          <Search size={22} strokeWidth={3} />
          <span>SEARCH</span>
        </motion.button>

      </motion.div>
    </div>
  );
};

export default ProfessionalSearch;