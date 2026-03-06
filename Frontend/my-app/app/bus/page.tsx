"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Bus, MapPin, Users, Wind, ShieldCheck, Zap } from "lucide-react";

const buses = [
  { id: 1, busNumber: "BA-01-1234", name: "GreenLine Deluxe", route: "Kathmandu → Pokhara", seatsAvailable: 12, price: "Rs. 1,500", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957" },
  { id: 2, busNumber: "BA-02-5678", name: "Swift Holiday", route: "Kathmandu → Chitwan", seatsAvailable: 3, price: "Rs. 1,200", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e" },
  { id: 3, busNumber: "BA-03-9012", name: "Mountain Express", route: "Pokhara → Butwal", seatsAvailable: 20, price: "Rs. 1,800", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
  { id: 4, busNumber: "BA-04-3456", name: "Night Rider", route: "Kathmandu → Biratnagar", seatsAvailable: 0, price: "Rs. 2,200", image: "https://images.unsplash.com/photo-1493238792000-8113da705763" }
];

// --- BACKGROUND COMPONENTS ---

const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500/10 rounded-full blur-3xl"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// --- BUS CARD COMPONENT ---

const BusCard = ({ bus, index }: { bus: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isFull = bus.seatsAvailable === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <div className="relative z-10 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
        
        {/* PRICE TAG */}
        <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-black shadow-lg">
          {bus.price}
        </div>

        {/* IMAGE SECTION */}
        <div className="h-52 overflow-hidden relative">
          <motion.img
            src={bus.image}
            alt={bus.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-black text-white leading-tight">{bus.name}</h2>
            <div className="flex items-center gap-2 text-white/60 text-xs mt-1">
              <span className="bg-white/10 px-2 py-0.5 rounded uppercase tracking-widest">{bus.busNumber}</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-white/80 mb-6 bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <MapPin size={18} className="text-blue-400" />
            </div>
            <span className="font-medium text-sm tracking-wide">{bus.route}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Availability</span>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-white/40" />
                <span className={`font-bold ${isFull ? "text-red-400" : "text-white"}`}>
                  {isFull ? "Sold Out" : `${bus.seatsAvailable} Seats`}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Status</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                isFull ? "border-red-500/50 text-red-400" : "border-green-500/50 text-green-400"
              }`}>
                {isFull ? "BOOKED" : "ON TIME"}
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={isFull}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl
              ${isFull 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/25 hover:to-blue-500"
              }`}
          >
            {isFull ? "Full House" : "Secure Your Seat"}
          </motion.button>
        </div>
      </div>

      {/* 3D GLOW EFFECT */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
    </motion.div>
  );
};

// --- MAIN PAGE ---

export default function BusSearchPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <BackgroundParticles />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-sm font-bold mb-6"
          >
            <Zap size={14} fill="currentColor" />
            <span>NEPAL'S FASTEST BOOKING ENGINE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            READY FOR THE <br /> <span className="text-blue-500">NEXT ADVENTURE?</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Premium fleet, real-time tracking, and zero booking fees. 
            Select your destination and ride in comfort.
          </motion.p>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          {[
            { label: "Daily Trips", val: "500+", icon: <Wind size={16}/> },
            { label: "Verified Fleet", val: "100%", icon: <ShieldCheck size={16}/> },
            { label: "Active Routes", val: "45", icon: <Bus size={16}/> },
            { label: "Support", val: "24/7", icon: <Users size={16}/> }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2 text-blue-400">{stat.icon}</div>
              <div className="text-xl font-bold">{stat.val}</div>
              <div className="text-[10px] uppercase text-white/40 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* BUS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {buses.map((bus, index) => (
            <BusCard key={bus.id} bus={bus} index={index} />
          ))}
        </div>
      </main>

      {/* DECORATIVE NOISE TEXTURE */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}