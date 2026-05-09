// src/pages/admin/AdminPendingPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X, Eye, CheckCircle2, Building2, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllBusinesses, updateBusinessStatus } from '../../services/businessService';
import Spinner from '../../components/common/Spinner';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const AdminPendingPage = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllBusinesses('pending');
      setPending(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateBusinessStatus(id, status);
      setPending(prev => prev.filter(b => b.id !== id));
      toast.success(`Business ${status}!`);
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <>
      <Helmet><title>Pending Review – Admin</title></Helmet>
      <AdminLayout title="Pending Review">
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="xl" /></div>
        ) : pending.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle2 size={56} className="mx-auto mb-4 text-emerald-400" />
            <p className="font-display font-semibold text-lg text-surface-700">All caught up!</p>
            <p className="text-sm font-body text-surface-400 mt-1">No pending businesses to review.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-body text-surface-500">{pending.length} business{pending.length !== 1 ? 'es' : ''} awaiting review</p>
            {pending.map(b => (
              <div key={b.id} className="bg-white rounded-xl p-5 shadow-card border border-surface-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-surface-100 rounded-xl flex items-center justify-center shrink-0">
                      <Building2 size={22} className="text-surface-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-surface-900">{b.name}</h3>
                      <p className="text-xs font-body text-surface-400 mt-0.5">{b.category} · {b.area}, {b.district}</p>
                      {b.description && (
                        <p className="text-sm font-body text-surface-500 mt-2 max-w-xl line-clamp-2">{b.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-2 text-xs font-body text-surface-400">
                        {b.phone && <span className="inline-flex items-center gap-1"><Phone size={11} /> {b.phone}</span>}
                        {b.email && <span className="inline-flex items-center gap-1"><Mail size={11} /> {b.email}</span>}
                        <span className="inline-flex items-center gap-1"><Clock size={11} /> Submitted {formatDate(b.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link to={`/business/${b.id}`} className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 text-surface-500 transition-colors" title="Preview">
                      <Eye size={15} />
                    </Link>
                    <button
                      onClick={() => handleStatus(b.id, 'rejected')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-body font-medium hover:bg-red-100 transition-colors"
                    >
                      <X size={13} /> Reject
                    </button>
                    <button
                      onClick={() => handleStatus(b.id, 'approved')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-body font-medium hover:bg-emerald-100 transition-colors"
                    >
                      <Check size={13} /> Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminPendingPage;
