'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Ticket, Search, CarFront } from "lucide-react";
import Button from "./button";
import logo from "../public/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find Buses", href: "/search-bus", icon: Search },
  { name: "For Drivers", href: "/drivers", icon: CarFront },
  { name: "My Tickets", href: "/tickets", icon: Ticket },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to change look when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 border-b
      ${scrolled 
        ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm h-16" 
        : "bg-white border-transparent h-20"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex h-full items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center overflow-hidden shadow-lg shadow-emerald-200">
              <img src={logo.src} alt="SuvYatra Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              Suv<span className="text-emerald-500">Yatra</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="http://localhost:5173/" className="text-sm font-bold text-slate-600 hover:text-emerald-500 transition">
              Login
            </Link>
            <Button variant="accent" className="rounded-full px-8 bg-slate-900 text-white hover:bg-emerald-600 transition-all shadow-md shadow-slate-200">
              Sign Up
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-900 border border-slate-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-slate-200 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 px-4 py-3 text-lg font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition"
            >
               {link.icon && <link.icon className="w-5 h-5 text-emerald-500" />}
               {link.name}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button className="rounded-2xl border-slate-200 py-4 font-bold">Login</Button>
            <Button className="rounded-2xl bg-emerald-500 text-white py-4 font-bold shadow-lg shadow-emerald-100">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}