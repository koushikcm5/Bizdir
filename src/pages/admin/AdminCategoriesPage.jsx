// src/pages/admin/AdminCategoriesPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../../services/locationService';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';
import { CATEGORY_ICON_MAP } from '../../utils/helpers';
import { Building2 } from 'lucide-react';

// Icon options shown in the picker — name strings that map to lucide components
const ICON_OPTIONS = [
  'UtensilsCrossed',  // Restaurants 🍽️
  'Hotel',            // Hotels 🏨
  'Stethoscope',      // Hospitals 🏥
  'School',           // Schools 🏫
  'ShoppingBag',      // Shopping 🛍️
  'Scissors',         // Salons 💇
  'Dumbbell',         // Gyms 💪
  'Smartphone',       // Electronics 📱
  'Car',              // Automobiles 🚗
  'Home',             // Real Estate 🏠
  'Plane',            // Travel ✈️
  'Scale',            // Legal ⚖️
  'Coins',            // Finance 💰
  'Monitor',          // IT Services 💻
  'HeartPulse',       // Healthcare ❤️🩹
  'BookOpen',         // Education 📚
  'Building2',        // Other 🏢
  'Drama',            // Entertainment 🎭
  'Gamepad2',         // Gaming 🎮
  'Leaf',             // Nature 🌿
];

// Render a lucide icon by its string name
const IconByName = ({ name, size = 22, className = '' }) => {
  const IconComp = CATEGORY_ICON_MAP[Object.keys(CATEGORY_ICON_MAP).find(
    k => CATEGORY_ICON_MAP[k]?.displayName === name || CATEGORY_ICON_MAP[k]?.name === name
  )] || Building2;
  return <IconComp size={size} className={className} />;
};

// Direct import map for picker (by string key)
import {
  UtensilsCrossed, Hotel, Stethoscope, School, ShoppingBag,
  Scissors, Dumbbell, Smartphone, Car, Home, Plane,
  Scale, Coins, Monitor, HeartPulse, BookOpen,
  Drama, Gamepad2, Leaf,
} from 'lucide-react';

const ICON_COMPONENT_MAP = {
  UtensilsCrossed, Hotel, Stethoscope, School, ShoppingBag,
  Scissors, Dumbbell, Smartphone, Car, Home, Plane,
  Scale, Coins, Monitor, HeartPulse, BookOpen, Building2,
  Drama, Gamepad2, Leaf,
};

const CatIcon = ({ name, size = 22, className = '' }) => {
  const Comp = ICON_COMPONENT_MAP[name] || Building2;
  return <Comp size={size} className={className} />;
};

const AdminCategoriesPage = () => {
  const { setCategories } = useStore();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editCat, setEditCat] = useState(null);
  const [form, setForm] = useState({ name: '', icon: 'Building2', color: '#f97316' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCats(data);
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditCat(null); setForm({ name: '', icon: 'Building2', color: '#f97316' }); setModal(true); };
  const openEdit = (cat) => { setEditCat(cat); setForm({ name: cat.name, icon: cat.icon || 'Building2', color: cat.color }); setModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name required'); return; }
    setSaving(true);
    try {
      if (editCat) {
        await updateCategory(editCat.id, form);
        toast.success('Category updated');
      } else {
        await addCategory(form);
        toast.success('Category added');
      }
      setModal(false);
      load();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await deleteCategory(id);
      load();
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <>
      <Helmet><title>Categories – Admin</title></Helmet>
      <AdminLayout title="Categories">
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button icon={Plus} size="sm" onClick={openAdd}>Add Category</Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Spinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {cats.map(cat => (
                <div key={cat.id} className="bg-white rounded-xl p-4 shadow-card border border-surface-100 text-center group relative">
                  <div className="flex justify-center mb-2">
                    <CatIcon name={cat.icon} size={28} className="text-primary-500" />
                  </div>
                  <p className="text-sm font-body font-medium text-surface-700 truncate">{cat.name}</p>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(cat)} className="p-1 rounded bg-surface-100 hover:bg-surface-200 text-surface-500">
                      <Edit2 size={11} />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-500">
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Modal open={modal} onClose={() => setModal(false)} title={editCat ? 'Edit Category' : 'Add Category'} size="sm">
          <div className="space-y-4">
            <Input label="Category Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Restaurants" />
            <div>
              <label className="block text-sm font-medium text-surface-700 font-body mb-2">Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map(iconName => (
                  <button
                    key={iconName}
                    type="button"
                    title={iconName}
                    onClick={() => setForm(f => ({ ...f, icon: iconName }))}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${form.icon === iconName ? 'bg-primary-100 ring-2 ring-primary-400 text-primary-600' : 'bg-surface-50 hover:bg-surface-100 text-surface-500'}`}
                  >
                    <CatIcon name={iconName} size={20} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 font-body mb-1">Color</label>
              <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} className="h-9 w-20 rounded-lg border border-surface-200 cursor-pointer" />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
              <Button loading={saving} onClick={handleSave}>{editCat ? 'Update' : 'Add'}</Button>
            </div>
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
};

export default AdminCategoriesPage;
