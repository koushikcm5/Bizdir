// src/pages/superadmin/SuperAdminLocationsPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Trash2, MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import SuperAdminLayout from '../../components/superadmin/SuperAdminLayout';
import { getLocations, addDistrict, addArea, deleteDistrict, updateDistrict } from '../../services/locationService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

const SuperAdminLocationsPage = () => {
  const { setLocations } = useStore();
  const [locations, setLocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [newDistrict, setNewDistrict] = useState('');
  const [newArea, setNewArea] = useState({});
  const [addingDistrict, setAddingDistrict] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getLocations();
      setLocs(data);
      setLocations(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAddDistrict = async () => {
    if (!newDistrict.trim()) { toast.error('Enter district name'); return; }
    try {
      await addDistrict(newDistrict.trim());
      setNewDistrict('');
      load();
      toast.success('District added');
    } catch { toast.error('Failed'); }
  };

  const handleAddArea = async (districtId) => {
    const area = newArea[districtId]?.trim();
    if (!area) { toast.error('Enter area name'); return; }
    try {
      await addArea(districtId, area);
      setNewArea(prev => ({ ...prev, [districtId]: '' }));
      load();
      toast.success('Area added');
    } catch { toast.error('Failed'); }
  };

  const handleDeleteArea = async (districtId, areaName, currentAreas) => {
    if (!window.confirm(`Delete area "${areaName}"?`)) return;
    try {
      await updateDistrict(districtId, { areas: currentAreas.filter(a => a !== areaName) });
      load();
      toast.success('Area deleted');
    } catch { toast.error('Failed'); }
  };

  const handleDeleteDistrict = async (id) => {
    if (!window.confirm('Delete this district and all its areas?')) return;
    try {
      await deleteDistrict(id);
      load();
      toast.success('District deleted');
    } catch { toast.error('Failed'); }
  };

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <Helmet><title>Locations – Super Admin</title></Helmet>
      <SuperAdminLayout title="Manage Locations">
        <div className="max-w-2xl space-y-4">
          {/* Add district */}
          <div className="bg-white rounded-xl p-5 shadow-card border border-surface-100">
            <h2 className="font-display font-semibold text-surface-900 mb-3">Add District</h2>
            <div className="flex gap-2">
              <Input
                value={newDistrict}
                onChange={e => setNewDistrict(e.target.value)}
                placeholder="e.g. Madurai"
                className="flex-1"
                onKeyDown={e => e.key === 'Enter' && handleAddDistrict()}
              />
              <Button icon={Plus} onClick={handleAddDistrict}>Add</Button>
            </div>
          </div>

          {/* Districts list */}
          {loading ? (
            <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          ) : (
            <div className="space-y-2">
              {locations.map(loc => (
                <div key={loc.id} className="bg-white rounded-xl shadow-card border border-surface-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-surface-50" onClick={() => toggle(loc.id)}>
                    <div className="flex items-center gap-3">
                      {expanded[loc.id] ? <ChevronDown size={16} className="text-surface-400" /> : <ChevronRight size={16} className="text-surface-400" />}
                      <MapPin size={15} className="text-primary-500" />
                      <span className="font-body font-semibold text-surface-800">{loc.name}</span>
                      <span className="text-xs font-body text-surface-400">({loc.areas?.length || 0} areas)</span>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); handleDeleteDistrict(loc.id); }}
                      className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {expanded[loc.id] && (
                    <div className="px-5 pb-4 border-t border-surface-50">
                      {/* Areas */}
                      <div className="flex flex-wrap gap-2 my-3">
                        {loc.areas?.map(area => (
                          <div key={area} className="flex items-center gap-1 bg-surface-100 pl-3 pr-1 py-1 rounded-full">
                            <span className="text-sm font-body text-surface-700">{area}</span>
                            <button
                              onClick={() => handleDeleteArea(loc.id, area, loc.areas)}
                              className="w-5 h-5 rounded-full hover:bg-surface-300 flex items-center justify-center text-surface-400 hover:text-red-500 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Add area */}
                      <div className="flex gap-2">
                        <Input
                          value={newArea[loc.id] || ''}
                          onChange={e => setNewArea(prev => ({ ...prev, [loc.id]: e.target.value }))}
                          placeholder="Add new area..."
                          className="flex-1"
                          onKeyDown={e => e.key === 'Enter' && handleAddArea(loc.id)}
                        />
                        <Button size="sm" variant="outline" icon={Plus} onClick={() => handleAddArea(loc.id)}>Add</Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {locations.length === 0 && (
                <p className="text-center text-sm font-body text-surface-400 py-8">No districts added yet.</p>
              )}
            </div>
          )}
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default SuperAdminLocationsPage;
