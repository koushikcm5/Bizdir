// src/pages/superadmin/SuperAdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Store, Star, Activity } from 'lucide-react';
import SuperAdminLayout from '../../components/superadmin/SuperAdminLayout';
import { getAnalytics } from '../../services/userService';
import Spinner from '../../components/common/Spinner';

const StatCard = ({ label, value, icon: Icon, color, sub }) => (
  <div className="bg-white rounded-xl p-5 shadow-card border border-surface-100">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
        <Icon size={18} className="text-white" />
      </div>
    </div>
    <p className="font-display font-bold text-3xl text-surface-900">{value ?? '—'}</p>
    <p className="text-sm font-body font-medium text-surface-500 mt-0.5">{label}</p>
    {sub && <p className="text-xs font-body text-surface-400 mt-1">{sub}</p>}
  </div>
);

const SuperAdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return <SuperAdminLayout title="Dashboard"><div className="flex justify-center py-20"><Spinner size="xl" /></div></SuperAdminLayout>;

  return (
    <>
      <Helmet><title>Super Admin – BizDir</title></Helmet>
      <SuperAdminLayout title="System Overview">
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Users" value={stats?.totalUsers} icon={Users} color="bg-blue-500" sub="All registered accounts" />
            <StatCard label="Total Businesses" value={stats?.totalBusinesses} icon={Store} color="bg-primary-500" sub={`${stats?.pendingBusinesses} pending`} />
            <StatCard label="Approved Listings" value={stats?.approvedBusinesses} icon={Activity} color="bg-emerald-500" sub="Live on directory" />
            <StatCard label="Total Reviews" value={stats?.totalReviews} icon={Star} color="bg-amber-500" sub="User submitted" />
          </div>

          {/* Status breakdown */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-surface-100">
            <h2 className="font-display font-semibold text-surface-900 mb-4">Business Status Breakdown</h2>
            <div className="space-y-3">
              {[
                { label: 'Approved', value: stats?.approvedBusinesses, total: stats?.totalBusinesses, color: 'bg-emerald-500' },
                { label: 'Pending', value: stats?.pendingBusinesses, total: stats?.totalBusinesses, color: 'bg-amber-500' },
                { label: 'Rejected', value: stats?.rejectedBusinesses, total: stats?.totalBusinesses, color: 'bg-red-500' },
              ].map(s => {
                const pct = stats?.totalBusinesses ? Math.round((s.value / s.totalBusinesses) * 100) : 0;
                return (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm font-body mb-1">
                      <span className="text-surface-600">{s.label}</span>
                      <span className="font-medium text-surface-800">{s.value} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default SuperAdminDashboardPage;
