"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// Using your image import logic
import img1 from "@/public/image.png";

const slides = [
  {
    id: 1,
    image: img1.src,
    title: "Luxury Travel",
    subtitle: "Experience the mountains in premium comfort.",
  },
  {
    id: 2,
    image: img1.src, // Replace with img2.src if available
    title: "Swift Connectivity",
    subtitle: "Connecting cities with unmatched punctuality.",
  },
];

export default function ProfessionalCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Framer Motion Variants for "Crazy" Slide Animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.2,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
    }),
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[600px] overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl group bg-slate-950">
      
      {/* SLIDES */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            filter: { duration: 0.4 }
          }}
          className="absolute inset-0"
        >
          {/* BACKGROUND IMAGE WITH PARALLAX EFFECT */}
          <motion.img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 10, ease: "linear" }}
          />
          
          {/* NEON OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          {/* CONTENT LAYER */}
          <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[2px] w-12 bg-blue-500" />
                <span className="text-blue-400 font-black text-xs uppercase tracking-[0.4em]">Featured Route</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight uppercase italic tracking-tighter">
                {slides[current].title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? "text-white" : "text-blue-500"}>{word} </span>
                ))}
              </h2>
              <p className="text-white/60 text-lg md:text-xl max-w-md font-medium leading-relaxed">
                {slides[current].subtitle}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-colors shadow-xl"
              >
                <Sparkles size={18} />
                BOOK THE JOURNEY
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION CONTROLS */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-20 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white pointer-events-auto transition-all"
        >
          <ChevronLeft size={32} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white pointer-events-auto transition-all"
        >
          <ChevronRight size={32} />
        </motion.button>
      </div>

      {/* DYNAMIC PROGRESS INDICATORS */}
      <div className="absolute bottom-10 left-12 md:left-24 flex gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className="relative h-1 w-12 md:w-24 bg-white/20 rounded-full overflow-hidden"
          >
            {index === current && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute inset-0 bg-blue-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* NOISE GRAIN OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}