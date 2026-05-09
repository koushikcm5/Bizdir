// src/pages/admin/AdminBusinessesPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit2, Trash2, Check, X, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllBusinesses, updateBusinessStatus, deleteBusiness } from '../../services/businessService';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import BusinessForm from '../../components/business/BusinessForm';
import Spinner from '../../components/common/Spinner';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { formatDate, statusColor } from '../../utils/helpers';
import toast from 'react-hot-toast';

const AdminBusinessesPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [editBiz, setEditBiz] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllBusinesses();
      setBusinesses(data);
      setFiltered(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let list = businesses;
    if (statusFilter) list = list.filter(b => b.status === statusFilter);
    if (search) list = list.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(list);
  }, [search, statusFilter, businesses]);

  const handleStatus = async (id, status) => {
    try {
      await updateBusinessStatus(id, status);
      setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      toast.success(`Business ${status}!`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this business?')) return;
    try {
      await deleteBusiness(id);
      setBusinesses(prev => prev.filter(b => b.id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <>
      <Helmet><title>Manage Businesses – Admin</title></Helmet>
      <AdminLayout title="Businesses">
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search businesses..."
                className="w-full pl-9 pr-3 py-2 text-sm font-body border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              options={[{ value: 'approved', label: 'Approved' }, { value: 'pending', label: 'Pending' }, { value: 'rejected', label: 'Rejected' }]}
              placeholder="All Status"
              className="w-full sm:w-40"
            />
            <Button icon={Plus} onClick={() => setAddModal(true)} size="sm">Add Business</Button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-card border border-surface-100 overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-16"><Spinner size="lg" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-50 border-b border-surface-100">
                    <tr>
                      {['Business', 'Category', 'Location', 'Status', 'Date', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-body font-medium text-surface-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-50">
                    {filtered.length === 0 ? (
                      <tr><td colSpan={6} className="px-4 py-8 text-center text-sm font-body text-surface-400">No businesses found</td></tr>
                    ) : filtered.map(b => (
                      <tr key={b.id} className="hover:bg-surface-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm font-body font-medium text-surface-800">{b.name}</p>
                          {b.phone && <p className="text-xs font-body text-surface-400">{b.phone}</p>}
                        </td>
                        <td className="px-4 py-3 text-sm font-body text-surface-500">{b.category}</td>
                        <td className="px-4 py-3 text-sm font-body text-surface-500">{b.area}, {b.district}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-body capitalize ${statusColor(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-body text-surface-400">{formatDate(b.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {b.status === 'pending' && (
                              <>
                                <button onClick={() => handleStatus(b.id, 'approved')} className="p-1.5 rounded hover:bg-emerald-50 text-emerald-600 transition-colors" title="Approve">
                                  <Check size={14} />
                                </button>
                                <button onClick={() => handleStatus(b.id, 'rejected')} className="p-1.5 rounded hover:bg-red-50 text-red-600 transition-colors" title="Reject">
                                  <X size={14} />
                                </button>
                              </>
                            )}
                            {b.status === 'approved' && (
                              <button onClick={() => handleStatus(b.id, 'rejected')} className="p-1.5 rounded hover:bg-amber-50 text-amber-600 transition-colors" title="Reject">
                                <X size={14} />
                              </button>
                            )}
                            {b.status === 'rejected' && (
                              <button onClick={() => handleStatus(b.id, 'approved')} className="p-1.5 rounded hover:bg-emerald-50 text-emerald-600 transition-colors" title="Approve">
                                <Check size={14} />
                              </button>
                            )}
                            <button onClick={() => setEditBiz(b)} className="p-1.5 rounded hover:bg-surface-100 text-surface-500 transition-colors" title="Edit">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="text-xs font-body text-surface-400">{filtered.length} of {businesses.length} businesses</p>
        </div>

        <Modal open={addModal} onClose={() => setAddModal(false)} title="Add Business" size="lg">
          <BusinessForm onSuccess={() => { setAddModal(false); load(); }} onCancel={() => setAddModal(false)} />
        </Modal>

        <Modal open={!!editBiz} onClose={() => setEditBiz(null)} title="Edit Business" size="lg">
          {editBiz && <BusinessForm business={editBiz} onSuccess={() => { setEditBiz(null); load(); }} onCancel={() => setEditBiz(null)} />}
        </Modal>
      </AdminLayout>
    </>
  );
};

export default AdminBusinessesPage;
