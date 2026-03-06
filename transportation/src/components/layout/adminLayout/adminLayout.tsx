import {
  LayoutDashboard,
  Bus,
  Users,
  Ticket,
  Settings,
  Bell,
  Search,
  Plus,
} from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200 font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 hidden lg:flex flex-col p-6 space-y-8">
        <div className="text-2xl font-bold text-white">
          Suv<span className="text-emerald-500">Yatra</span>
          <span className="block text-xs uppercase text-slate-500 tracking-widest">
            Admin
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Bus size={20} />} label="Manage Buses" />
          <a href="/booking"><NavItem icon={<Ticket size={20} />} label="Bookings" /></a>
          <NavItem icon={<Users size={20} />} label="Customers" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main */}
      
      
    </div>
  );
};
const NavItem = ({ icon, label, active = false }: any) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
    ${active ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-white/5 text-slate-400"}`}
  >
    {icon}
    {label}
  </button>
);

/* Components */







export default AdminLayout;
