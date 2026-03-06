"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Ticket, Search, CarFront, LogIn } from "lucide-react";
import Button from "./button";
import logo from "../public/logo.png";

const navLinks = [
  { name: "Home", href: "/", icon: null },
  { name: "Find Buses", href: "/bus", icon: Search },
  { name: "For Drivers", href: "/drivers", icon: CarFront },
  { name: "My Tickets", href: "/tickets", icon: Ticket },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync scroll state for the glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] p-4 transition-all duration-500">
      <div 
        className={`container mx-auto max-w-7xl rounded-[2.5rem] border transition-all duration-500 ${
          scrolled 
          ? "bg-slate-900/90 backdrop-blur-2xl border-white/10 shadow-2xl py-2 px-6" 
          : "bg-white/10 backdrop-blur-xl border-white/20 py-4 px-8"
        }`}
      >
        <div className="flex h-14 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center overflow-hidden shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
              <img
                src={logo.src}
                alt="SuvYatra Logo"
                className="h-8 w-8 object-contain brightness-0 invert"
              />
            </div>

            <span className="text-xl font-black text-white tracking-tighter uppercase">
              Suv
              <span className="text-emerald-500">Yatra</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-all rounded-xl hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon size={16} className="text-emerald-500" />}
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="http://localhost:5173/" 
              className="text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <User size={18} />
              Login
            </Link>
            <Button 
              variant="accent" 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-2xl px-6 py-2 shadow-lg shadow-emerald-500/20 border-none"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 flex flex-col gap-3 border-t border-white/10 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 text-white/80 hover:text-emerald-400 transition-all border border-transparent hover:border-white/5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      {link.icon ? <link.icon size={20} /> : <LogIn size={20} />}
                    </div>
                    <span className="font-bold tracking-wide">{link.name}</span>
                  </Link>
                ))}

                <div className="mt-4 flex flex-col gap-3">
                  <Button variant="outline" className="w-full py-4 border-white/10 text-white hover:bg-white/5">
                    Login
                  </Button>
                  <Button variant="accent" className="w-full py-4 bg-emerald-500 text-slate-900 font-black">
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}