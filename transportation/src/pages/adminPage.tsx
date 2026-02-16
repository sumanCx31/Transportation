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

const AdminPage = () => {
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
          <NavItem icon={<Ticket size={20} />} label="Bookings" />
          <NavItem icon={<Users size={20} />} label="Customers" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="border border-white/10 rounded-3xl px-6 py-4 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-white">
              Dashboard Overview
            </h1>
            <p className="text-slate-400">
              Welcome back, Admin. Here's what's happening today.
            </p>
          </div>
          <div className="flex"></div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button className="relative p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Revenue" value="12,840" change="+12%" icon={<Ticket />} />
          <StatCard title="Active Buses" value="48" change="On Route" icon={<Bus />} />
          <StatCard title="New Customers" value="156" change="+5%" icon={<Users />} />
          <StatCard title="Tickets Sold" value="1,204" change="+18%" icon={<LayoutDashboard />} />
        </div>

        {/* Table */}
        <section className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Recent Bookings</h3>
            <button className="flex items-center gap-2 bg-emerald-500 text-slate-900 px-4 py-2 rounded-xl font-semibold hover:bg-emerald-400">
              <Plus size={18} />
              Add Bus
            </button>
          </div>

          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Bus Type</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <TableRow name="Arjun Thapa" type="AC Deluxe" route="Kathmandu → Pokhara" status="Confirmed" amount="25" />
              <TableRow name="Sita Sharma" type="Sleeper" route="Lumbini → Kathmandu" status="Pending" amount="18" />
              <TableRow name="David Miller" type="Luxury" route="Chitwan → Pokhara" status="Cancelled" amount="30" />
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

/* Components */

const NavItem = ({ icon, label, active = false }: any) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
    ${active ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-white/5 text-slate-400"}`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
    <div className="flex justify-between mb-4">
      <div className="p-3 bg-white/5 rounded-xl text-emerald-400">{icon}</div>
      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
        {change}
      </span>
    </div>
    <p className="text-slate-400 text-sm">{title}</p>
    <h3 className="text-3xl font-bold text-white">{value}</h3>
  </div>
);

const statusMap: any = {
  Confirmed: "text-emerald-400 bg-emerald-400/10",
  Pending: "text-yellow-400 bg-yellow-400/10",
  Cancelled: "text-rose-400 bg-rose-400/10",
};

const TableRow = ({ name, type, route, status, amount }: any) => (
  <tr className="hover:bg-white/5">
    <td className="px-6 py-4 text-white">{name}</td>
    <td className="px-6 py-4 text-slate-400">{type}</td>
    <td className="px-6 py-4 text-slate-400">{route}</td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusMap[status]}`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 font-bold text-white">{amount}</td>
  </tr>
);

export default AdminPage;
