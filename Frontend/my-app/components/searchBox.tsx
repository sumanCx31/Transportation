"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MapPin, Navigation, Calendar, Search } from "lucide-react";
import searchService from "@/services/search.service";
import { useSearchStore } from "@/store/useSearchStore";

const ProfessionalSearch = () => {
  const router = useRouter();
  const setResults = useSearchStore((state) => state.setResults);

  const [formData, setFormData] = React.useState({
    from: "",
    to: "",
    date: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await searchService.postRequest("/search", formData);
      const busList = response.data.data;
      setResults(busList);

      sessionStorage.setItem("bus_results", JSON.stringify(busList));

      const slug = `${formData.from}-to-${formData.to}`
        .toLowerCase()
        .replace(/\s+/g, "-");
      router.push(
        `/route-result/${slug}?from=${formData.from}&to=${formData.to}&date=${formData.date}`,
      );
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full p-10 bg-gray-50 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl relative flex flex-col lg:flex-row items-center gap-2 p-3 
                   bg-slate-900/60 backdrop-blur-2xl border border-white/20 
                   rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        {/* FROM FIELD */}
        <div className="w-full flex-1 px-6 py-3 border-r border-white/10">
          <label className="flex items-center gap-2 text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">
            <MapPin size={14} /> From
          </label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="Origin City"
            className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-white/30"
          />
        </div>

        {/* TO FIELD */}
        <div className="w-full flex-1 px-6 py-3 border-r border-white/10">
          <label className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <Navigation size={14} /> To
          </label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="Destination"
            className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-white/30"
          />
        </div>

        {/* DATE FIELD */}
        <div className="w-full flex-1 px-6 py-3">
          <label className="flex items-center gap-2 text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-1">
            <Calendar size={14} /> Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-transparent border-none outline-none text-white text-lg [color-scheme:dark] cursor-pointer"
          />
        </div>

        {/* SEARCH BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={loading}
          className="w-full lg:w-auto h-16 px-12 bg-white text-slate-900 font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            "SEARCHING..."
          ) : (
            <>
              <Search size={22} strokeWidth={3} />
              <span>SEARCH</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProfessionalSearch;
