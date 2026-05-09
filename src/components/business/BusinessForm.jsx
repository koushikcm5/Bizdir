// src/components/business/BusinessForm.jsx
import React, { useState, useEffect } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import useStore from '../../store/useStore';
import { addBusiness, updateBusiness, uploadBusinessImage } from '../../services/businessService';
import toast from 'react-hot-toast';

const BusinessForm = ({ business, onSuccess, onCancel }) => {
  const { locations, categories, user } = useStore();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState(business?.images || []);
  const [selectedDistrict, setSelectedDistrict] = useState(business?.district || '');

  const [form, setForm] = useState({
    name: business?.name || '',
    category: business?.category || '',
    district: business?.district || '',
    area: business?.area || '',
    description: business?.description || '',
    phone: business?.phone || '',
    email: business?.email || '',
    address: business?.address || '',
    website: business?.website || '',
    lat: business?.lat || '',
    lng: business?.lng || '',
    tags: business?.tags?.join(', ') || '',
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const currentDistrict = locations.find(l => l.name === selectedDistrict);
  const areas = currentDistrict?.areas || [];

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setForm(f => ({ ...f, district: e.target.value, area: '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    const newPreviews = files.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.district) {
      toast.error('Please fill required fields');
      return;
    }
    setLoading(true);
    try {
      const data = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        createdBy: user.uid,
        categoryIcon: categories.find(c => c.name === form.category)?.icon || 'Building2',
      };

      if (business?.id) {
        let newImageUrls = [];
        if (images.length) {
          newImageUrls = await Promise.all(images.map(f => uploadBusinessImage(f, business.id)));
        }
        await updateBusiness(business.id, {
          ...data,
          images: [...(business.images || []), ...newImageUrls],
        });
        toast.success('Business updated!');
      } else {
        await addBusiness(data, images);
        toast.success('Business submitted for review!');
      }
      onSuccess?.();
    } catch (err) {
      toast.error('Failed to save business');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input label="Business Name *" value={form.name} onChange={set('name')} placeholder="e.g. Raj Catering Services" required />
        </div>

        <Select
          label="Category *"
          value={form.category}
          onChange={set('category')}
          options={categories.map(c => ({ value: c.name, label: c.name }))}
          placeholder="Select category"
          required
        />

        <Select
          label="District *"
          value={form.district}
          onChange={handleDistrictChange}
          options={locations.map(l => ({ value: l.name, label: l.name }))}
          placeholder="Select district"
          required
        />

        <Select
          label="Area *"
          value={form.area}
          onChange={set('area')}
          options={areas.map(a => ({ value: a, label: a }))}
          placeholder="Select area"
          disabled={!selectedDistrict}
        />

        <Input label="Phone" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" type="tel" />
        <Input label="Email" value={form.email} onChange={set('email')} placeholder="contact@business.com" type="email" />
        <Input label="Website" value={form.website} onChange={set('website')} placeholder="https://business.com" className="sm:col-span-2" />

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-surface-700 font-body mb-1">Address</label>
          <textarea
            value={form.address}
            onChange={set('address')}
            rows={2}
            className="w-full rounded-lg border border-surface-200 px-3 py-2.5 text-sm font-body text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            placeholder="Full street address"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-surface-700 font-body mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={set('description')}
            rows={3}
            className="w-full rounded-lg border border-surface-200 px-3 py-2.5 text-sm font-body text-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            placeholder="Describe your business, services offered..."
          />
        </div>

        <Input label="Tags (comma-separated)" value={form.tags} onChange={set('tags')} placeholder="catering, events, wedding" className="sm:col-span-2" />

        <Input label="Latitude" value={form.lat} onChange={set('lat')} placeholder="11.0168" type="number" step="any" />
        <Input label="Longitude" value={form.lng} onChange={set('lng')} placeholder="76.9558" type="number" step="any" />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-surface-700 font-body mb-2">Photos</label>
        <div className="flex flex-wrap gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative w-20 h-20">
              <img src={src} alt="" className="w-full h-full object-cover rounded-lg border border-surface-200" />
              <button type="button" onClick={() => removeImage(i)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                <X size={10} />
              </button>
            </div>
          ))}
          <label className="w-20 h-20 border-2 border-dashed border-surface-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
            <Upload size={16} className="text-surface-400" />
            <span className="text-[10px] text-surface-400 mt-1">Add</span>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        )}
        <Button type="submit" loading={loading}>
          {business ? 'Update Business' : 'Submit for Review'}
        </Button>
      </div>
    </form>
  );
};

export default BusinessForm;
