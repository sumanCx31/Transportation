'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Ticket, Search, CarFront, LogOut, User } from "lucide-react";
import Button from "./button";
import logo from "../public/logo.png";
import { useAuth } from "@/context/auth.context";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find Buses", href: "/bus", icon: Search },
  { name: "For Drivers", href: "/drivers", icon: CarFront },
  { name: "My Tickets", href: "/tickets", icon: Ticket },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
 const {loggedInUser} = useAuth();
 console.log("Response:",loggedInUser?.email);
 
// console.log(loggedInUser);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 border-b mb-5 shadow-2xs shadow-slate-400 
      ${scrolled 
        ? "bg-slate-900/80 backdrop-blur-xl border-white shadow-lg shadow-slate-900/5 h-16" 
        : "bg-slate-800 border-transparent h-20"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-full shadow-2xs shadow-slate-400 ">
        <div className="flex h-full items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center overflow-hidden shadow-emerald-200 shadow-2xs group-hover:scale-105 transition-transform">
              <Image 
                src={logo} 
                alt="Logo" 
                fill 
                className="object-cover p-1.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white leading-none">
                Suv<span className="text-emerald-500">Yatra</span>
              </span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-1">Smart Travel</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-50/50 p-1 rounded-full border border-slate-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2
                    ${isActive 
                      ? "bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200" 
                      : "text-slate-800 hover:text-emerald-500 hover:bg-white/50"
                    }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions Section */}
          <div className="hidden md:flex items-center gap-4">
            {!mounted ? (
              <div className="w-32 h-10 bg-slate-100 animate-pulse rounded-full" /> 
            ) : loggedInUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                  <div className="text-right hidden lg:block">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Logged in as</p>
                    <p className="text-sm font-black text-slate-300">{loggedInUser.name}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5 shadow-md bg-slate-50 overflow-hidden">
                    <img 
                      src={loggedInUser.image?.secureUrl || "/default-avatar.png"} 
                      alt="User" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="group flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-sm transition-colors"
                >
                  <div className="p-2 rounded-lg group-hover:bg-red-50">
                    <LogOut size={18} />
                  </div>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-emerald-600 px-4">
                  Login
                </Link>
                <Button className="rounded-full px-7 bg-slate-900 text-white hover:bg-emerald-600 transition-all shadow-2xs shadow-slate-400 active:scale-95">
                  Sign Up Free
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 active:scale-90 transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown with Framer Motion */}
      <AnimatePresence>
        {isOpen && mounted && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full bg-white border-b border-slate-200 p-6 space-y-4 shadow-2xl backdrop-blur-3xl"
          >
            {loggedInUser && (
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                 <img 
                  src={loggedInUser.image?.secureUrl || "/default-avatar.png"} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" 
                  alt="Profile"
                />
                <div>
                  <p className="text-lg font-black text-slate-900 leading-none">{loggedInUser.name}</p>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1.5">Premium Passenger</p>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 text-base font-bold rounded-2xl transition-all
                    ${pathname === link.href ? "bg-emerald-600 text-white" : "hover:bg-slate-50 text-slate-700"}`}
                >
                   {link.icon && <link.icon className={pathname === link.href ? "w-5 h-5 text-white" : "w-5 h-5 text-emerald-500"} />}
                   {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              {loggedInUser ? (
                 <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 text-red-600 font-black"
                 >
                   <LogOut size={20} /> Sign Out Account
                 </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full rounded-2xl py-4 font-black border-slate-200">Login</Button>
                  <Button className="w-full rounded-2xl bg-emerald-600 text-white py-4 font-black shadow-lg shadow-emerald-100">Create Account</Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}