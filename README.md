# Hifah Technologies - Demo Task

##  Overview
Fleet management dashboard built for Hifah Technologies technical assessment. Track drivers, clients, and earnings with a clean, responsive interface.

**Live Demo:** [https://demo-task-9riq.vercel.app/](https://demo-task-9riq.vercel.app/)  
**GitHub:** [https://github.com/rafideveloper7/demo-task](https://github.com/rafideveloper7/demo-task)  
**Login:** `ubktowing@gmail.com` / `Ubk.ali@2025`

##  Features
- **Authentication** - Secure login with protected routes
- **Dashboard** - Key metrics, driver/client lists with tabs
- **Drivers** - List, filter by status, search, pagination
- **Clients** - List with service badges, filter by type
- **Smart API Layer** - Auto-falls back to mock data when real API fails (CORS)
- **Fully Responsive** - Mobile cards, tablet grids, desktop tables

##  Tech Stack
React 18 | Tailwind CSS | React Router | Axios | Vite

##  Quick Start
```bash
git clone https://github.com/rafideveloper7/demo-task.git
npm install
npm run dev
```

##  Key Highlights
- **CORS Handling**: APIs had CORS issues → built auto-fallback to mock data
- **Figma Perfect**: Pixel-perfect implementation of provided design
- **Resilient**: UI never breaks, always shows data (real or mock)

##  Structure
```
src/
├── features/    # Auth, drivers, clients, stats
├── layouts/     # Dashboard layout
├── services/    # API + mock data (auto-switch)
└── pages/       # Page components
```

---
**Submitted for:** Hifah Technologies - Frontend Developer Task