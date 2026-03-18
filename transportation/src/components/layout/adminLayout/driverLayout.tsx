import { LayoutDashboard, Bus, Users, Ticket, Settings, MessageCircle } from "lucide-react";
import { Outlet } from "react-router";

const DriverPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 hidden lg:flex flex-col p-6 space-y-8">
        <div className="text-2xl font-bold text-white">
          Suv<span className="text-emerald-500">Yatra</span>
          <span className="block text-xs uppercase text-slate-500 tracking-widest"></span>
        </div>

        <nav className="flex-1 space-y-2">
          <a href="/driver">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={location.pathname === "/driver"}
            />
          </a>
          <a href="/driver/update-trip">
            <NavItem
              icon={<Bus size={20} />}
              label="Manage Buses"
              active={location.pathname.includes("/admin/manage-buses")}
            />
          </a>
          <a href="/driver/view-booking">
            <NavItem
              icon={<Ticket size={20} />}
              label="Bookings"
              active={location.pathname.includes("/admin/bookings")}
            />
          </a>

          <a href="/driver/settings">
            <NavItem
              icon={<MessageCircle size={20} />}
              label="Chat"
              active={location.pathname.includes("/admin/settings")}
            />
          </a>
          
          <a href="/driver/settings">
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              active={location.pathname.includes("/admin/settings")}
            />
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Stats */}
        <Outlet />
      </main>
    </div>
  );
};

/* Components */

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

export default DriverPage;
