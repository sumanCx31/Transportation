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
import { useAuth } from "../../context/auth.context";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [busCount, setBusCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuth();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [statsRes, busRes] = await Promise.all([
          authSvc.getRequest("/auth/getuser"),
          authSvc.getRequest("/bus"),
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

  if (loading) {
    return (
      <p className="text-slate-500 text-sm p-6 sm:p-10">
        Synchronizing fleet data...
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">

      {/* ✅ HEADER */}
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

        {/* Left */}
        <div className="border border-white/10 rounded-3xl px-4 sm:px-6 py-4 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Dashboard Overview
          </h1>

          {/* ❗ FIXED STRING BUG */}
          <p className="text-slate-400 text-sm sm:text-base">
            Welcome back, {loggedInUser?.name}. Here's what's happening today.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-2.5 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 
              focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 w-fit">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full" />
          </button>

        </div>
      </header>

      {/* ✅ STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Revenue"
          value="12,840"
          change="+12%"
          icon={<Ticket />}
        />
        <StatCard
          title="Active Buses"
          value={busCount}
          change="On Route"
          icon={<Bus />}
        />
        <StatCard
          title="Total Users"
          value={stats?.TotalUsers || 0}
          change="+5%"
          icon={<Users />}
        />
        <StatCard
          title="Tickets Sold"
          value="1,204"
          change="+18%"
          icon={<LayoutDashboard />}
        />
      </div>

      {/* ✅ TABLE SECTION */}
      <section className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto">
        <div className="p-4 sm:p-6 text-slate-400 text-sm">
          Table content goes here...
        </div>
      </section>

    </div>
  );
};

export default Dashboard;