// src/pages/BusinessDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Phone, Mail, Globe, Star, Heart, Share2,
  Clock, ChevronLeft, Send, Building2
} from 'lucide-react';
import { getBusinessById, getReviewsForBusiness, addReview, toggleFavorite } from '../services/businessService';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import useStore from '../store/useStore';
import { formatDate, statusColor } from '../utils/helpers';
import toast from 'react-hot-toast';

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(n => (
      <button key={n} type="button" onClick={() => onChange(n)} className="text-2xl transition-transform hover:scale-110">
        <Star size={22} className={n <= value ? 'text-amber-400 fill-amber-400' : 'text-surface-200'} />
      </button>
    ))}
  </div>
);

const BusinessDetailPage = () => {
  const { id } = useParams();
  const { user, userData, shortlisted, toggleShortlist } = useStore();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const isSaved = shortlisted.includes(id);

  useEffect(() => {
    Promise.all([getBusinessById(id), getReviewsForBusiness(id)])
      .then(([biz, revs]) => {
        setBusiness(biz);
        setReviews(revs);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!user) { toast.error('Login to save'); return; }
    toggleShortlist(id);
    await toggleFavorite(user.uid, id, !isSaved);
    toast.success(isSaved ? 'Removed' : 'Saved!');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Login to review'); return; }
    if (reviewForm.rating === 0) { toast.error('Please select a rating'); return; }
    setSubmitting(true);
    try {
      await addReview({
        businessId: id,
        userId: user.uid,
        userName: userData?.name || 'Anonymous',
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      const revs = await getReviewsForBusiness(id);
      setReviews(revs);
      setReviewForm({ rating: 0, comment: '' });
      toast.success('Review submitted!');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Spinner size="xl" /></div>;
  if (!business) return (
    <div className="text-center py-20">
      <p className="font-body text-surface-500">Business not found.</p>
      <Link to="/search" className="inline-flex items-center gap-1 text-primary-500 hover:underline mt-2"><ChevronLeft size={14} /> Back to search</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{business.name} – BizDir</title>
        <meta name="description" content={business.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-body text-surface-400 mb-6">
          <Link to="/" className="hover:text-surface-600">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-surface-600">Search</Link>
          <span>/</span>
          <span className="text-surface-700 font-medium">{business.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-surface-100">
              <div className="relative h-64 sm:h-80 bg-surface-100">
                {business.images?.length > 0 ? (
                  <img src={business.images[activeImg]} alt={business.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 size={64} className="text-surface-300" />
                  </div>
                )}
              </div>
              {business.images?.length > 1 && (
                <div className="flex gap-2 p-3">
                  {business.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-primary-500' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-surface-100">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-body text-surface-500">{business.category}</span>
                    <Badge variant={business.status === 'approved' ? 'success' : 'warning'}>
                      {business.status}
                    </Badge>
                  </div>
                  <h1 className="font-display font-bold text-2xl text-surface-900">{business.name}</h1>
                </div>
                {business.rating > 0 && (
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl shrink-0">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="font-display font-bold text-lg text-amber-700">{business.rating}</span>
                    <span className="text-xs font-body text-amber-600">({business.reviewCount})</span>
                  </div>
                )}
              </div>

              {business.description && (
                <p className="text-sm font-body text-surface-600 leading-relaxed mb-5">{business.description}</p>
              )}

              {business.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {business.tags.map(tag => (
                    <span key={tag} className="bg-surface-100 text-surface-600 text-xs font-body px-2.5 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-surface-100">
              <h2 className="font-display font-semibold text-lg text-surface-900 mb-5">Reviews ({reviews.length})</h2>

              {/* Submit review */}
              <form onSubmit={handleReviewSubmit} className="bg-surface-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-body font-medium text-surface-700 mb-3">Write a review</p>
                <div className="mb-3">
                  <StarRating value={reviewForm.rating} onChange={r => setReviewForm(f => ({ ...f, rating: r }))} />
                </div>
                <div className="flex gap-2">
                  <input
                    value={reviewForm.comment}
                    onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    placeholder="Share your experience..."
                    className="flex-1 rounded-lg border border-surface-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <Button type="submit" loading={submitting} size="sm" icon={Send}>Post</Button>
                </div>
              </form>

              {/* Review list */}
              {reviews.length === 0 ? (
                <p className="text-sm font-body text-surface-400 text-center py-4">No reviews yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map(r => (
                    <div key={r.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-bold text-primary-600 shrink-0">
                        {r.userName?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-body font-medium text-surface-800">{r.userName}</span>
                          <div className="flex">
                            {[1,2,3,4,5].map(n => <Star key={n} size={11} className={n <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-surface-200'} />)}
                          </div>
                          <span className="text-xs font-body text-surface-400">{formatDate(r.createdAt)}</span>
                        </div>
                        {r.comment && <p className="text-sm font-body text-surface-600">{r.comment}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-surface-100">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleSave}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-body font-medium transition-all ${
                    isSaved ? 'bg-red-50 border-red-200 text-red-600' : 'border-surface-200 text-surface-600 hover:bg-surface-50'
                  }`}
                >
                  <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => { navigator.share?.({ title: business.name, url: window.location.href }); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-surface-200 text-sm font-body font-medium text-surface-600 hover:bg-surface-50 transition-all"
                >
                  <Share2 size={15} /> Share
                </button>
              </div>

              {business.phone && (
                <a href={`tel:${business.phone}`} className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl text-sm font-body font-semibold transition-colors">
                  <Phone size={15} /> Call Now
                </a>
              )}
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-surface-100 space-y-3">
              <h3 className="font-display font-semibold text-surface-900 text-sm">Contact Info</h3>

              {business.phone && (
                <div className="flex items-center gap-3 text-sm font-body">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Phone size={14} className="text-primary-500" />
                  </div>
                  <a href={`tel:${business.phone}`} className="text-surface-700 hover:text-primary-600">{business.phone}</a>
                </div>
              )}

              {business.email && (
                <div className="flex items-center gap-3 text-sm font-body">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Mail size={14} className="text-primary-500" />
                  </div>
                  <a href={`mailto:${business.email}`} className="text-surface-700 hover:text-primary-600 truncate">{business.email}</a>
                </div>
              )}

              {business.website && (
                <div className="flex items-center gap-3 text-sm font-body">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Globe size={14} className="text-primary-500" />
                  </div>
                  <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate">{business.website}</a>
                </div>
              )}

              {(business.address || business.area) && (
                <div className="flex items-start gap-3 text-sm font-body">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-primary-500" />
                  </div>
                  <div className="text-surface-700">
                    {business.address && <p>{business.address}</p>}
                    <p>{business.area}, {business.district}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Map placeholder */}
            {business.lat && business.lng && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-surface-100">
                <a
                  href={`https://maps.google.com/?q=${business.lat},${business.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-48 bg-surface-100 relative group"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 group-hover:bg-surface-200 transition-colors">
                    <MapPin size={32} className="text-primary-500" />
                    <span className="text-sm font-body font-medium text-surface-600">Open in Maps</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDetailPage;
