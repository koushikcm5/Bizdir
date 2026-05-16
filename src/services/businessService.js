// src/services/businessService.js
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, where, orderBy, limit,
  startAfter, serverTimestamp, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { db } from './firebase'; // storage disabled during testing

const BUSINESSES = 'businesses';

// ── Fetch ────────────────────────────────────────────────────────────────────

export const getBusinesses = async (filters = {}, lastDoc = null, pageSize = 12) => {
  let q = collection(db, BUSINESSES);
  const constraints = [where('status', '==', 'approved')];

  if (filters.district) constraints.push(where('district', '==', filters.district));
  if (filters.area) constraints.push(where('area', '==', filters.area));
  if (filters.category) constraints.push(where('category', '==', filters.category));

  constraints.push(orderBy('createdAt', 'desc'));
  constraints.push(limit(pageSize));
  if (lastDoc) constraints.push(startAfter(lastDoc));

  q = query(q, ...constraints);
  const snap = await getDocs(q);
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return { businesses: docs, lastDoc: snap.docs[snap.docs.length - 1] || null };
};

export const getBusinessById = async (id) => {
  const snap = await getDoc(doc(db, BUSINESSES, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const searchBusinesses = async (keyword, filters = {}) => {
  const constraints = [where('status', '==', 'approved')];
  if (filters.district) constraints.push(where('district', '==', filters.district));
  if (filters.category) constraints.push(where('category', '==', filters.category));
  constraints.push(orderBy('name'));

  const q = query(collection(db, BUSINESSES), ...constraints);
  const snap = await getDocs(q);
  const kw = keyword.toLowerCase();
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(b =>
      b.name?.toLowerCase().includes(kw) ||
      b.description?.toLowerCase().includes(kw) ||
      b.tags?.some(t => t.toLowerCase().includes(kw))
    );
};

export const getFeaturedBusinesses = async (count = 6) => {
  const q = query(
    collection(db, BUSINESSES),
    where('status', '==', 'approved'),
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ── Admin ────────────────────────────────────────────────────────────────────

export const getAllBusinesses = async (status = null) => {
  const constraints = status ? [where('status', '==', status)] : [];
  constraints.push(orderBy('createdAt', 'desc'));
  const q = query(collection(db, BUSINESSES), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addBusiness = async (data, images = []) => {
  // Image upload skipped during testing (Storage not enabled)
  const docRef = await addDoc(collection(db, BUSINESSES), {
    ...data,
    images: [],
    status: 'pending',
    featured: false,
    rating: 0,
    reviewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateBusiness = async (id, data) => {
  await updateDoc(doc(db, BUSINESSES, id), { ...data, updatedAt: serverTimestamp() });
};

export const deleteBusiness = async (id) => {
  await deleteDoc(doc(db, BUSINESSES, id));
};

export const updateBusinessStatus = async (id, status) => {
  await updateDoc(doc(db, BUSINESSES, id), { status, updatedAt: serverTimestamp() });
};
export const upsertBusiness = async (data) => {
  const q = query(collection(db, BUSINESSES), where('name', '==', data.name));
  const snap = await getDocs(q);
  
  if (!snap.empty) {
    const docId = snap.docs[0].id;
    await updateDoc(doc(db, BUSINESSES, docId), { ...data, updatedAt: serverTimestamp() });
    return { id: docId, type: 'update' };
  } else {
    const docRef = await addDoc(collection(db, BUSINESSES), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, type: 'create' };
  }
};

// ── Images ───────────────────────────────────────────────────────────────────
// Storage is disabled during testing. Enable when Firebase Storage is set up.
export const uploadBusinessImage = async (file, businessId = 'temp') => {
  console.warn('Image upload skipped: Firebase Storage not enabled yet.');
  return null;
};

// ── Favorites ────────────────────────────────────────────────────────────────

export const toggleFavorite = async (userId, businessId, isAdding) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    shortlisted: isAdding ? arrayUnion(businessId) : arrayRemove(businessId),
  });
};

export const getFavoriteBusinesses = async (ids) => {
  if (!ids?.length) return [];
  const results = await Promise.all(ids.map(id => getBusinessById(id)));
  return results.filter(Boolean);
};

// ── Reviews ──────────────────────────────────────────────────────────────────

export const addReview = async ({ businessId, userId, userName, rating, comment }) => {
  await addDoc(collection(db, 'reviews'), {
    businessId, userId, userName, rating, comment,
    createdAt: serverTimestamp(),
  });
  // Update business rating (simplified)
  const reviews = await getReviewsForBusiness(businessId);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  await updateDoc(doc(db, BUSINESSES, businessId), {
    rating: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
  });
};

export const getReviewsForBusiness = async (businessId) => {
  const q = query(
    collection(db, 'reviews'),
    where('businessId', '==', businessId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
