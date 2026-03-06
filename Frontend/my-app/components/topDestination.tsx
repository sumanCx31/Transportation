"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Navigation, Sparkles } from "lucide-react";

const routes = [
  { from: "Kathmandu", to: "Janakpur", price: "Rs. 1200" },
  { from: "Kathmandu", to: "Chitwan", price: "Rs. 800" },
  { from: "Pokhara", to: "Butwal", price: "Rs. 950" },
  { from: "Kathmandu", to: "Dharan", price: "Rs. 1500" },
  { from: "Biratnagar", to: "Kathmandu", price: "Rs. 1600" },
  { from: "Nepalgunj", to: "Surkhet", price: "Rs. 500" },
];

const TopDestinations = () => {
  return (
    <section className="w-full bg-transparent py-24 px-6 relative overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADING SECTION */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={14} />
            Popular Expeditions
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
            Top <span className="text-emerald-500">Routes</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl font-medium">
            Join thousands of travelers on Nepal's most reliable and premium bus network.
          </p>
        </div>

        {/* ROUTES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* CARD GLOW EFFECT */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 overflow-hidden">
                
                {/* DECORATIVE ELEMENTS */}
                <div className="absolute -right-4 -top-4 text-white/[0.03] group-hover:text-emerald-500/[0.05] transition-colors">
                   <Navigation size={120} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors duration-300">
                      <MapPin size={20} />
                    </div>
                    <span className="text-[10px] font-black text-emerald-500/60 tracking-widest uppercase bg-emerald-500/5 px-3 py-1 rounded-lg">
                      {route.price}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Origin</p>
                    <h3 className="text-2xl font-black text-white tracking-tight">{route.from}</h3>
                  </div>

                  <div className="py-4 flex items-center gap-4">
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                       <ArrowRight className="text-emerald-500" size={20} />
                    </motion.div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Destination</p>
                    <h3 className="text-2xl font-black text-emerald-500 tracking-tight">{route.to}</h3>
                  </div>

                  <motion.button
                    className="mt-8 w-full py-3 bg-white/5 border border-white/10 text-white text-xs font-black rounded-xl uppercase tracking-widest group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300"
                  >
                    View Schedule
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopDestinations;