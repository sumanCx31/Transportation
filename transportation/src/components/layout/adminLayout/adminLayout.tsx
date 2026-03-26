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
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate, Link } from "react-router"; // ✅ Changed to Link
import { useAuth } from "../../../context/auth.context";
import { toast } from "sonner";

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(true); // ✅ Added loading state
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  // ✅ 1. Auth Grace Period: Wait for session to load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthorizing(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ 2. Protection Logic inside useEffect
  useEffect(() => {
    if (isAuthorizing) return;

    if (!loggedInUser) {
      toast.error("Please login first!");
      navigate("/login");
    } else if (loggedInUser.role !== 'admin') {
      toast.error("Access Denied!", {
        description: "Only Admin can access this route!!"
      });
      navigate("/");
    }
  }, [loggedInUser, navigate, isAuthorizing]);

  // ✅ 3. Show Loader to prevent blank screen flicker
  if (isAuthorizing || !loggedInUser || loggedInUser.role !== 'admin') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mb-4"></div>
        <p className="text-slate-400">Verifying Admin Session...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 
        bg-slate-900 border-r border-white/10 
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 flex flex-col p-6 space-y-8`}
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Suv<span className="text-emerald-500">Yatra</span>
          </div>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* ✅ FIX: Use <Link> instead of <a> */}
        <nav className="flex-1 space-y-2">
          <Link to="/admin" onClick={() => setIsOpen(false)}>
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={location.pathname === "/admin"}
            />
          </Link>

          <Link to="/admin/manage-buses" onClick={() => setIsOpen(false)}>
            <NavItem
              icon={<Bus size={20} />}
              label="Manage Buses"
              active={location.pathname.includes("/admin/manage-buses")}
            />
          </Link>

          <Link to="/admin/banners" onClick={() => setIsOpen(false)}>
            <NavItem
              icon={<Bus size={20} />}
              label="Banners"
              active={location.pathname.includes("/admin/banners")}
            />
          </Link>

          <Link to="/admin/bookings" onClick={() => setIsOpen(false)}>
            <NavItem
              icon={<Ticket size={20} />}
              label="Bookings"
              active={location.pathname.includes("/admin/bookings")}
            />
          </Link>

          <Link to="/admin/users" onClick={() => setIsOpen(false)}>
            <NavItem
              icon={<Users size={20} />}
              label="Customers"
              active={location.pathname.includes("/admin/users")}
            />
          </Link>

          <Link to="/admin/chat" onClick={() => setIsOpen(false)}>
            <NavItem
              icon={<MessageCircle size={20} />}
              label="Chat"
              active={location.pathname.includes("/admin/chat")}
            />
          </Link>

          <Link to="/admin/settings" onClick={() => setIsOpen(false)}>
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              active={location.pathname.includes("/admin/settings")}
            />
          </Link>
        </nav>
      </aside>

      {/* Mobile Navbar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col min-h-screen overflow-hidden">
        <div className="lg:hidden flex items-center p-4 border-b border-white/10">
          <button onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
          <h1 className="ml-4 font-semibold text-white">Admin Panel</h1>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/* Nav Item Component */
const NavItem = ({ icon, label, active = false }: any) => (
  <div
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer
    ${
      active
        ? "bg-emerald-500/10 text-emerald-400 font-bold"
        : "hover:bg-white/5 text-slate-400"
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default AdminPage;