"use client";


import { motion } from "framer-motion";
import { Hash, Users, Bus, User, Phone, ShieldCheck } from "lucide-react";
import { Controller } from "react-hook-form";

export interface IFormInputs {
  control: any;
  name: string;
  errMsg?: string;
}


export const BusDetailGrid = ({
  control,
  name,
  errMsg = "",
}: Readonly<IFormInputs>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
          <div className="w-full max-w-5xl mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row">
          
          {/* 1. Visual Identity (Image Section) */}
          <div className="lg:w-1/3 relative h-64 lg:h-auto">
            <img 
              src={busData.image} 
              alt={busData.name} 
              className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r" />
            
            {/* Overlay Status */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
              <ShieldCheck size={14} className="text-slate-950" />
              <span className="text-[10px] font-black uppercase text-slate-950 tracking-widest">Verified Unit</span>
            </div>
          </div>

          {/* 2. Data Manifest (Grid Section) */}
          <div className="lg:w-2/3 p-8 lg:p-12">
            <div className="mb-8">
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Fleet Category: Deluxe</p>
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                {busData.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              {/* Bus Number */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-emerald-500 border border-white/5">
                  <Hash size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Registry Number</p>
                  <p className="text-lg font-black text-slate-200">{busData.busNumber}</p>
                </div>
              </div>

              {/* Total Seats */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-emerald-500 border border-white/5">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Passenger Capacity</p>
                  <p className="text-lg font-black text-slate-200">{busData.totalSeats} Seats</p>
                </div>
              </div>

              {/* Driver Name */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-emerald-500 border border-white/5">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Assigned Driver</p>
                  <p className="text-lg font-black text-slate-200">{busData.driverName}</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-emerald-500 border border-white/5">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contact Protocol</p>
                  <p className="text-lg font-black text-slate-200">{busData.phone}</p>
                </div>
              </div>
            </div>

            {/* Bottom Decoration/Action Area */}
            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Operational Status: Online
              </div>
              <button className="text-emerald-500 hover:text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-colors">
                Modify Fleet Data →
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>

            </>
        )}
      />
    </>
  );
};

export default BusDetailGrid;