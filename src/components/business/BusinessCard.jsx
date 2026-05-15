// src/components/business/BusinessCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Star, Heart, Building2,
  UtensilsCrossed, Hotel, Stethoscope, School, ShoppingBag,
  Scissors, Dumbbell, Smartphone, Car, Home, Plane,
  Scale, Coins, Monitor, HeartPulse, BookOpen,
  Drama, Gamepad2, Leaf,
} from 'lucide-react';
import { clsx } from 'clsx';
import { truncate } from '../../utils/helpers';
import useStore from '../../store/useStore';
import { toggleFavorite } from '../../services/businessService';
import toast from 'react-hot-toast';

const ICON_MAP = {
  UtensilsCrossed, Hotel, Stethoscope, School, ShoppingBag,
  Scissors, Dumbbell, Smartphone, Car, Home, Plane,
  Scale, Coins, Monitor, HeartPulse, BookOpen, Building2,
  Drama, Gamepad2, Leaf,
};

const CatIcon = ({ name, size = 40 }) => {
  const Comp = ICON_MAP[name] || Building2;
  return <Comp size={size} className="text-surface-300" />;
};

const BusinessCard = ({ business }) => {
  const { user, userData, shortlisted, toggleShortlist } = useStore();
  const isSaved = shortlisted.includes(business.id);

  const [imgError, setImgError] = React.useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Login to save businesses');
      return;
    }
    try {
      toggleShortlist(business.id);
      await toggleFavorite(user.uid, business.id, !isSaved);
      toast.success(isSaved ? 'Removed from saved' : 'Saved!');
    } catch {
      toggleShortlist(business.id); // revert
      toast.error('Failed to update');
    }
  };

  return (
    <Link
      to={`/business/${business.id}`}
      className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col border border-surface-100 hover:border-primary-200"
    >
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-surface-100 to-surface-200 overflow-hidden">
        {business.images?.[0] && !imgError ? (
          <img
            src={business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CatIcon name={business.categoryIcon} size={52} />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-body font-medium text-surface-700 shadow-sm">
          {business.category}
        </span>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={clsx(
            'absolute top-3 right-3 w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all duration-200',
            isSaved
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/90 text-surface-400 hover:text-red-500 hover:bg-white'
          )}
        >
          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-surface-900 text-base leading-snug group-hover:text-primary-600 transition-colors line-clamp-1">
            {business.name}
          </h3>
          {business.rating > 0 && (
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star size={11} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-body font-semibold text-amber-700">{business.rating}</span>
            </div>
          )}
        </div>

        <p className="text-xs font-body text-surface-400 mb-3 line-clamp-2 leading-relaxed flex-1">
          {truncate(business.description, 90)}
        </p>

        <div className="space-y-1.5 mt-auto">
          <div className="flex items-center gap-2 text-xs font-body text-surface-500">
            <MapPin size={12} className="text-primary-400 shrink-0" />
            <span className="truncate">{business.area}, {business.district}</span>
          </div>
          {business.phone && (
            <div className="flex items-center gap-2 text-xs font-body text-surface-500">
              <Phone size={12} className="text-primary-400 shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
