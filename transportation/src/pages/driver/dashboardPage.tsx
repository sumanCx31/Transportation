"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Bus,
  Users,
  Ticket,
  Bell,
  Search,
} from "lucide-react";
import authSvc from "../../services/Auth.service";
import StatCard from "../../components/layout/card";

const DriverDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [busCount, setBusCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Stats and Bus Count in parallel
        const [statsRes, busRes] = await Promise.all([
          authSvc.getRequest("/auth/getuser"),
          authSvc.getRequest("/bus"), // Assuming this returns an array
        ]);

        setStats(statsRes.data);
        setBusCount(busRes.data?.length || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-slate-500 text-sm p-10">Synchronizing fleet data...</p>
    );

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div className="border border-white/10 rounded-3xl px-6 py-4 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400">
            Welcome back, Driver. Here's what's happening today.
          </p>
        </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Revenue"
          value="12,840"
          change="+12%"
          icon={<Ticket />}
        />
        <StatCard
          title="Total Users"
          value={stats?.TotalUsers || 0}
          icon={<Users />}
        />
        <StatCard
          title="Tickets Sold"
          value="1,204"
          change="+18%"
          icon={<LayoutDashboard />}
        />
      </div>

      <section className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden">
        {/* Table content... */}
      </section>
    </>
  );
};

export default DriverDashboard;
