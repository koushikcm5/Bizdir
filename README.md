# 🏢 BizDir — Business Listing Web Application

A **production-ready**, full-stack business directory platform built with **React.js** + **Firebase**. Similar to Justdial, BizDir allows users to discover local businesses filtered by district, area, and category with full role-based access control.

---

## 🚀 Features

### Public
- **Smart Search** — Filter by District → Area → Category with real-time suggestions
- **Business Profiles** — Full details with images, map, ratings, reviews
- **Save/Shortlist** — Bookmark favorite businesses
- **Categories & Locations** — Browse by category or location

### Users
- Register/Login (Email or Google)
- Save/shortlist businesses
- Submit business listings (goes for review)
- Write reviews & ratings
- Personal dashboard

### Admin
- Approve / Reject business listings
- Add / Edit / Delete businesses
- Manage categories
- View pending submissions

### Super Admin
- Manage all users, promote to Admin
- Manage districts and areas
- System-wide analytics dashboard
- Full control over all businesses

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6 |
| State | Zustand |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Firebase (Auth, Firestore, Storage) |
| SEO | React Helmet Async |
| Notifications | React Hot Toast |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── common/          # Shared UI (Navbar, Footer, Button, Input, Modal…)
│   ├── business/        # BusinessCard, BusinessForm
│   ├── search/          # SearchBar
│   ├── admin/           # AdminSidebar, AdminLayout
│   └── superadmin/      # SuperAdminSidebar, SuperAdminLayout
├── pages/
│   ├── HomePage.jsx
│   ├── SearchPage.jsx
│   ├── BusinessDetailPage.jsx
│   ├── LoginPage.jsx / RegisterPage.jsx
│   ├── UserDashboardPage.jsx
│   ├── FavoritesPage.jsx
│   ├── admin/           # Admin pages
│   └── superadmin/      # Super Admin pages
├── services/            # Firebase service modules
├── store/               # Zustand global store
├── context/             # AuthContext
├── hooks/               # useDebounce, useBusinesses
├── utils/               # Helpers, mock data
└── styles/              # Global CSS
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
# Install dependencies
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Email/Password + Google
4. Create **Firestore Database** (start in test mode, then apply rules)
5. Enable **Storage**
6. Copy your config from Project Settings → Your Apps

### 3. Environment Variables

```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

### 4. Deploy Firebase Rules

```bash
npm install -g firebase-tools
firebase login
firebase init   # select Firestore + Storage
firebase deploy --only firestore:rules,storage
```

### 5. Run the App

```bash
npm start
```

---

## 🔐 Role System

Roles are stored in Firestore `users/{uid}.role`:

| Role | Access |
|------|--------|
| `user` | Browse, save, review, submit listings |
| `admin` | All user + approve/reject/manage listings & categories |
| `super_admin` | All admin + manage users, locations, system analytics |

**To create your first Super Admin:**
1. Register normally via the app
2. In Firebase Console → Firestore → users → find your document
3. Change `role` field from `user` to `super_admin`

---

## 🗄️ Firestore Data Model

```
users/            {name, email, role, shortlisted[], createdAt}
businesses/       {name, category, district, area, description, phone,
                   images[], status, featured, rating, reviewCount, createdBy}
categories/       {name, icon, color}
locations/        {name, areas[]}
reviews/          {businessId, userId, userName, rating, comment, createdAt}
```

---

## 🎨 Design System

- **Font**: Syne (display) + DM Sans (body)
- **Primary**: Orange (#f97316) — warm, local feel
- **Surface**: Stone grays
- **Components**: Cards with soft shadows, rounded-xl, hover transitions

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `build/` — deploy to Firebase Hosting, Vercel, or Netlify.

### Deploy to Firebase Hosting

```bash
firebase init hosting
npm run build
firebase deploy --only hosting
```

---

## 🔧 Key Design Decisions

- **Zustand** for lightweight global state (auth, filters, categories)
- **Firestore compound indexes** needed for multi-filter queries (create via Firebase Console when prompted)
- **Lazy loading** all pages via `React.lazy()` for performance
- **Debounced search** (350ms) prevents excessive Firestore reads
- **Mock data fallback** — app works without Firebase data (shows sample categories/locations)

---

## 📝 License

MIT — Built for production use.
