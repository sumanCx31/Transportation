"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Ticket, Bell, Search } from "lucide-react";
import authSvc from "../../services/Auth.service";
import StatCard from "../../components/layout/card";
import { useAuth } from "../../context/auth.context";

const DriverDashboard = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

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
      <header className="flex flex-col lg:flex-row lg:justify-between gap-6 mb-10">
        {/* LEFT */}
        <div className="border border-white/10 rounded-3xl px-4 sm:px-6 py-4 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Dashboard Overview
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Welcome back, {loggedInUser?.name}.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          {/* 🔹 Profile + Logout */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            {/* Profile */}
            <div className="flex items-center gap-3">
              <img
                src={loggedInUser?.image?.secureUrl || "/default-avatar.png"}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover border border-white/10"
              />
              <span className="text-sm text-white hidden sm:block">
                {loggedInUser?.name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl 
              bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V7"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* 🔹 Search + Notification */}
          <div className="flex items-center gap-4 w-full">
            {/* Search */}
            <div className="relative flex-1">
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
            <button className="relative p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full" />
            </button>
          </div>
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
        <StatCard
          title="Total Buses"
          value={busCount}
          icon={<LayoutDashboard />}
        />
      </div>

      {/* ✅ TABLE */}
      <section className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto">
        <div className="p-4 sm:p-6 text-slate-400 text-sm">
          Table content goes here...
        </div>
      </section>
    </div>
  );
};

export default DriverDashboard;
