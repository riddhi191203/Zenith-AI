import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Clock3, Gem, Sparkles, TrendingUp } from "lucide-react";
import CreationItem from "../components/CreationItem";
import api from "../lib/api";

const StatCard = ({ label, value, icon: Icon, className = "bg-blue-600" }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <h2 className="mt-1 text-3xl font-bold text-slate-800">{value}</h2>
      </div>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${className}`}>
        {React.createElement(Icon, { className: "h-5 w-5" })}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDashboardData = useCallback(async () => {
    try {
      const { data } = await api.get("/api/user/get-user-creations");

      if (!data.success) return toast.error(data.message);
      setCreations(data.creations);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <section className="h-full overflow-hidden bg-slate-50 p-4 lg:p-6">
      <div className="flex h-full min-h-0 flex-col">
        <header className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Zenith AI Dashboard
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome Back
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Manage your AI creations, track activity, and revisit everything
              you've generated with Zenith AI.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Creations" value={creations.length} icon={Sparkles} />
          <StatCard
            label="Active Plan"
            value="Premium"
            icon={Gem}
            className="bg-amber-500"
          />
          <StatCard
            label="Productivity"
            value="+92%"
            icon={TrendingUp}
            className="bg-emerald-600"
          />
          <StatCard label="AI Runtime" value="24/7" icon={Clock3} className="bg-cyan-600" />
        </div>

        <section className="mt-5 flex min-h-0 flex-1 flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">Recent Creations</h2>
            <p className="mt-1 text-sm text-slate-500">Your latest AI-generated content</p>
          </div>

          {loading ? (
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
            </div>
          ) : creations.length === 0 ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Sparkles className="h-9 w-9" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-800">No Creations Yet</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Start using Zenith AI tools to generate articles, images, and more.
              </p>
            </div>
          ) : (
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
              {creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
