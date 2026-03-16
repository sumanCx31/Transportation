'use client';

import { useState } from "react";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
              <img src={logo.src} alt="SuvYatra Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">
              Suv<span className="text-emerald-500">Yatra</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
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
          <div className="hidden md:flex items-center gap-3">
            <Link href="http://localhost:5173/" className="text-sm font-medium hover:text-emerald-500 transition">
              Login
            </Link>
            <Button variant="accent" className="rounded-full px-6">Sign Up</Button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg bg-white/5">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-background/95 backdrop-blur-lg border-b border-white/10 p-4 space-y-2 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl transition"
            >
              {link.name}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button variant="ghost">Login</Button>
            <Button variant="accent">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}