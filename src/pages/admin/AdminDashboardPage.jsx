// src/pages/admin/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store, CheckSquare, XCircle, Clock } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllBusinesses } from '../../services/businessService';
import { getAnalytics } from '../../services/userService';
import Spinner from '../../components/common/Spinner';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-5 shadow-card border border-surface-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-body font-medium text-surface-400 mb-1">{label}</p>
        <p className="font-display font-bold text-2xl text-surface-900">{value}</p>
      </div>
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
        <Icon size={18} className="text-white" />
      </div>
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAnalytics(), getAllBusinesses()])
      .then(([analytics, businesses]) => {
        setStats(analytics);
        setRecent(businesses.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLayout title="Dashboard"><div className="flex justify-center py-20"><Spinner size="xl" /></div></AdminLayout>;

  return (
    <>
      <Helmet><title>Admin Dashboard – BizDir</title></Helmet>
      <AdminLayout title="Dashboard">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Businesses" value={stats?.totalBusinesses || 0} icon={Store} color="bg-primary-500" />
            <StatCard label="Approved" value={stats?.approvedBusinesses || 0} icon={CheckSquare} color="bg-emerald-500" />
            <StatCard label="Pending" value={stats?.pendingBusinesses || 0} icon={Clock} color="bg-amber-500" />
            <StatCard label="Rejected" value={stats?.rejectedBusinesses || 0} icon={XCircle} color="bg-red-500" />
          </div>

          {/* Recent listings */}
          <div className="bg-white rounded-xl shadow-card border border-surface-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-surface-100">
              <h2 className="font-display font-semibold text-surface-900">Recent Listings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-50 border-b border-surface-100">
                  <tr>
                    {['Name', 'Category', 'Location', 'Status', 'Submitted'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-body font-medium text-surface-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-50">
                  {recent.map(b => (
                    <tr key={b.id} className="hover:bg-surface-50">
                      <td className="px-4 py-3 text-sm font-body font-medium text-surface-800">{b.name}</td>
                      <td className="px-4 py-3 text-sm font-body text-surface-500">{b.category}</td>
                      <td className="px-4 py-3 text-sm font-body text-surface-500">{b.area}, {b.district}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-body capitalize
                          ${b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-body text-surface-400">
                        {b.createdAt?.toDate?.()?.toLocaleDateString() || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardPage;
