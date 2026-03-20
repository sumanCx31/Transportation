"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Bus,
  Users,
  Ticket,
  Settings,
  MessageCircle,
  Menu,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../context/auth.context";
import { toast } from "sonner";
import { Descriptions } from "antd";

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const Navigate = useNavigate();
  const {loggedInUser} = useAuth();
  if(loggedInUser?.role !== 'admin'){
    toast.error("You do not have permission to access this route!",{
      description:"Only Admin Can access this route!!"
    })
    Navigate("/")
  }
  
  
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200 font-sans">
      {/* ✅ Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 
      bg-slate-900 backdrop-blur-md lg:bg-slate-900
        border-r border-white/10 
         transform transition-transform duration-300 z-50
         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
         lg:translate-x-0 flex flex-col p-6 space-y-8`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          Suv<span className="text-emerald-500">Yatra</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          <a href="/admin">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={location.pathname === "/admin"}
            />
          </a>

          <a href="/admin/manage-buses">
            <NavItem
              icon={<Bus size={20} />}
              label="Manage Buses"
              active={location.pathname.includes("/admin/manage-buses")}
            />
          </a>

          <a href="/admin/bookings">
            <NavItem
              icon={<Ticket size={20} />}
              label="Bookings"
              active={location.pathname.includes("/admin/bookings")}
            />
          </a>

          <a href="/admin/users">
            <NavItem
              icon={<Users size={20} />}
              label="Customers"
              active={location.pathname.includes("/admin/users")}
            />
          </a>

          <a href="/driver/settings">
            <NavItem
              icon={<MessageCircle size={20} />}
              label="Chat"
              active={location.pathname.includes("/admin/settings")}
            />
          </a>

          <a href="/admin/settings">
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              active={location.pathname.includes("/admin/settings")}
            />
          </a>
        </nav>
      </aside>

      {/* ✅ Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ✅ Main */}
      <main className="flex-1 w-full">
        {/* ✅ Mobile Navbar */}
        <div className="lg:hidden flex items-center p-4 border-b border-white/10">
          <button onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
          <h1 className="ml-4 font-semibold">Admin Panel</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/* Nav Item */
const NavItem = ({ icon, label, active = false }: any) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
    ${
      active
        ? "bg-emerald-500/10 text-emerald-400"
        : "hover:bg-white/5 text-slate-400"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default AdminPage;
