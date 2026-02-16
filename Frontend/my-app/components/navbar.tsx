'use client';

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  Ticket,
  Search,
  CarFront,
} from "lucide-react";
import Button from "./button";
import logo from "../public/logo.png";

const navLinks = [
  { name: "Home", href: "/", icon: null },
  { name: "Find Buses", href: "/search-bus", icon: Search },
  { name: "For Drivers", href: "/drivers", icon: CarFront },
  { name: "My Tickets", href: "/tickets", icon: Ticket },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-2">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          {/* Logo */}
<Link href="/" className="flex items-center gap-2 whitespace-nowrap">
  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
    <img
      src={logo.src}
      alt="SuvYatra Logo"
      className="h-15 object-contain"
    />
  </div>

  <span className="text-xl font-bold flex items-center">
    Suv
    <span className="text-green-500 ml-1">Yatra</span>
  </span>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="
                  relative inline-flex items-center gap-2 px-2 py-1
                  text-foreground/80 hover:text-foreground transition
                  after:absolute after:left-1/2 after:bottom-0
                  after:h-0.5 after:w-full after:bg-blue-600
                  after:-translate-x-1/2 after:scale-x-0
                  after:origin-center after:transition-transform after:duration-300
                  hover:after:scale-x-100
                "
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">
              <User className="w-4 h-4 mr-2" />
              <a href="http://localhost:5173/">Login</a>
            </Button>
            <Button variant="accent">Sign Up</Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    relative inline-flex items-center gap-3 px-4 py-3
                    text-foreground hover:bg-muted rounded-lg transition
                    after:absolute after:left-1/2 after:bottom-1
                    after:h-[2px] after:w-[80%] after:bg-primary
                    after:-translate-x-1/2 after:scale-x-0
                    after:origin-center after:transition-transform after:duration-300
                    hover:after:scale-x-100
                  "
                >
                  {link.icon && (
                    <link.icon className="w-5 h-5 text-primary" />
                  )}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}

              <div className="mt-4 flex gap-2 px-4">
                <Button variant="outline" className="flex-1">
                  Login
                </Button>
                <Button variant="accent" className="flex-1">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
