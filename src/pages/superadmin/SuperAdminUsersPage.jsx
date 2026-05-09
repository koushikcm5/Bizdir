// src/pages/superadmin/SuperAdminUsersPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Shield, User, Trash2 } from 'lucide-react';
import SuperAdminLayout from '../../components/superadmin/SuperAdminLayout';
import { getAllUsers, updateUserRole, deleteUser } from '../../services/userService';
import Spinner from '../../components/common/Spinner';
import Select from '../../components/common/Select';
import { formatDate, roleColor } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ROLES = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

const SuperAdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setFiltered(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let list = users;
    if (roleFilter) list = list.filter(u => u.role === roleFilter);
    if (search) list = list.filter(u =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(list);
  }, [search, roleFilter, users]);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
      toast.success('Role updated');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('User deleted');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <>
      <Helmet><title>Users – Super Admin</title></Helmet>
      <SuperAdminLayout title="Users & Admins">
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-9 pr-3 py-2 text-sm font-body border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <Select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              options={ROLES}
              placeholder="All Roles"
              className="w-full sm:w-44"
            />
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
                      {['User', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-body font-medium text-surface-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-50">
                    {filtered.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-sm font-body text-surface-400">No users found</td></tr>
                    ) : filtered.map(u => (
                      <tr key={u.id} className="hover:bg-surface-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600 shrink-0">
                              {u.name?.[0]?.toUpperCase() || '?'}
                            </div>
                            <span className="text-sm font-body font-medium text-surface-800">{u.name || 'Unnamed'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-body text-surface-500">{u.email}</td>
                        <td className="px-4 py-3">
                          <select
                            value={u.role}
                            onChange={e => handleRoleChange(u.id, e.target.value)}
                            className={`text-xs font-body font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 ${roleColor(u.role)}`}
                          >
                            {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-xs font-body text-surface-400">{formatDate(u.createdAt)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <p className="text-xs font-body text-surface-400">{filtered.length} of {users.length} users</p>
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default SuperAdminUsersPage;
