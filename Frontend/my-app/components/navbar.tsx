'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Ticket, Search, CarFront, LogOut, User } from "lucide-react";
import Button from "./button";
import logo from "../public/logo.png";
import { useAuth } from "../context/auth.context"; // Import your auth hook
import { log } from "console";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find Buses", href: "/search-bus", icon: Search },
  { name: "For Drivers", href: "/drivers", icon: CarFront },
  { name: "My Tickets", href: "/tickets", icon: Ticket },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 1. Get user data from context
  const { loggedInUser } = useAuth();
  console.log(loggedInUser);
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Simple Logout Handler
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b
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

          {/* Desktop Actions - CONDITIONAL RENDERING */}
          <div className="hidden md:flex items-center gap-4">
            {loggedInUser ? (
              /* User is Logged In */
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Welcome</p>
                    <p className="text-sm font-black text-slate-900">{loggedInUser.name}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5 shadow-md">
                    <img 
                      src={loggedInUser.image?.secureUrl || "/default-avatar.png"} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              /* User is NOT Logged In */
              <>
                <Link href="http://localhost:5173/" className="text-sm font-bold text-slate-600 hover:text-emerald-500 transition">
                  Login
                </Link>
                <Button className="rounded-full px-8 bg-slate-900 text-white hover:bg-emerald-600 transition-all shadow-md shadow-slate-200">
                  Sign Up
                </Button>
              </>
            )}
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
          {/* Show User Info in Mobile Menu if logged in */}
          {loggedInUser && (
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
               <img 
                src={loggedInUser.image?.secureUrl || "/default-avatar.png"} 
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" 
                alt="Profile"
              />
              <div>
                <p className="text-lg font-black text-slate-900 leading-none">{loggedInUser.name}</p>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter mt-1">Active User</p>
              </div>
            </div>
          )}

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

          <div className="pt-4 border-t border-slate-100">
            {loggedInUser ? (
               <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 text-red-600 font-bold"
               >
                 <LogOut size={20} /> Logout
               </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button className="rounded-2xl border-slate-200 py-4 font-bold">Login</Button>
                <Button className="rounded-2xl bg-emerald-500 text-white py-4 font-bold shadow-lg shadow-emerald-100">Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}