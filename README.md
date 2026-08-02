<div align="center">

# 📚 EnglishEase — English Learning Platform

**Learn English step by step with Khmer translation**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://english-lms-beige.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com)

</div>

---

## 🎯 Purpose

EnglishEase was built with two goals in mind:

1. **Solve a real teaching problem** — as an English teacher, I needed a simple, structured way to deliver lessons to my students: grammar lessons with clear Khmer explanations, reading practice, vocabulary building, and progress tracking — all in one place.
2. **Explore the capabilities of opencode** — this project is also a hands-on experiment to see what an AI coding agent (opencode) can build end-to-end: from architecture and implementation to deployment.

---

## ✨ Features

### 🎓 For Students
- **Grammar lessons** — structured units with step-by-step explanations, quizzes, and homework, translated into Khmer
- **Stories reader** — short reading stories to practice comprehension
- **Vocabulary builder** — categorized word lists with Khmer translations
- **Spaced-repetition review** — smart review queue to reinforce what you've learned
- **Bookmarks** — save lessons, stories, and words for later
- **Progress tracking** — personal dashboard with statistics and charts
- **Leaderboard** — see how you rank against other learners
- **Text-to-speech** — hear pronunciation of words and phrases

### 🛠️ For Admins
- **Dashboard** — overview of platform activity and key metrics
- **Content management** — create and edit grammar lessons, stories, and vocabulary
- **User management** — view and manage learner accounts and roles
- **Review queue** — moderate content submissions
- **Real-time updates** — WebSocket-powered live updates across the admin UI

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 7, TypeScript, Tailwind CSS 4, shadcn/ui (Radix UI) |
| **State & Data** | TanStack Query, Axios, React Router, Recharts |
| **Backend** | NestJS 11, Socket.IO, Swagger |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | Clerk (frontend SDK + backend SDK, JWT verification) |
| **Real-time** | Socket.IO (admin gateway) |
| **Deployment** | Vercel (frontend), Render via Docker (backend) |

---

## 📁 Project Structure

```
.
├── frontend/               # React + Vite + TypeScript SPA
│   ├── src/
│   │   ├── api/            # API clients for each resource
│   │   ├── components/     # UI + layout + learning components
│   │   ├── data/           # Seed data (grammar, stories, vocabulary)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Student & admin pages
│   │   └── types/          # Shared TypeScript types
│   ├── vercel.json         # Vercel config (SPA rewrites)
│   └── vite.config.ts
│
└── backend/                # NestJS API
    ├── src/
    │   ├── auth/           # Clerk auth integration
    │   ├── users/          # User management
    │   ├── grammar/        # Grammar lessons
    │   ├── stories/        # Reading stories
    │   ├── vocabulary/     # Vocabulary words
    │   ├── progress/       # Quiz attempts & progress
    │   ├── bookmarks/      # Saved items
    │   ├── notes/          # User notes
    │   ├── review/         # Spaced-repetition review
    │   ├── leaderboard/    # Rankings
    │   ├── admin/          # Admin controls + WebSocket gateway
    │   └── health/         # Health check
    ├── scripts/seed.ts     # Database seeding script
    └── Dockerfile
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Clerk account** — create an application at [clerk.com](https://clerk.com) to get your publishable key and secret key

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

Seed the database with starter content (grammar units, stories, vocabulary):

```bash
npm run seed
```

Start the API:

```bash
npm run start:dev
```

Swagger API docs will be available at `http://localhost:4000/docs`.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:4000/api
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` and sign in with your Clerk account. To get admin access, set the `role` of your user to `admin` in the MongoDB `users` collection.

---

## ☁️ Deployment

### Frontend — Vercel

The frontend deploys automatically to [Vercel](https://vercel.com). The included `vercel.json` handles SPA routing (all routes fall back to `index.html`).

1. Import the repository in Vercel (framework preset: **Vite**).
2. Set the environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_API_URL` (your deployed backend URL, e.g. `https://your-backend.onrender.com/api`)
3. Build command: `npm run build` — Output directory: `dist` (already configured in `vercel.json`).

### Backend — Render (Docker)

The backend deploys via the included `Dockerfile`:

1. Create a **Web Service** on [Render](https://render.com) and point it at the `backend/` directory.
2. Set the environment variables:
   - `PORT`
   - `MONGODB_URI`
   - `CLERK_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`
   - `FRONTEND_URL` (your Vercel frontend URL)
3. Add `CLERK`'s backend URL to the **JWT templates / allowed origins** in your Clerk dashboard if needed.

---

## 📖 API Documentation

Interactive Swagger docs are available at `/docs` on the backend:

- Local: `http://localhost:4000/docs`
- Production: `https://<your-backend>/docs`

All endpoints (except `/health`) require a Clerk-issued bearer token.

---

## 📜 Scripts

| Package | Script | Description |
|---|---|---|
| `frontend` | `npm run dev` | Start Vite dev server |
| `frontend` | `npm run build` | Type-check + production build |
| `frontend` | `npm run preview` | Preview production build |
| `frontend` | `npm run typecheck` | TypeScript type check |
| `backend` | `npm run start:dev` | Start NestJS in watch mode |
| `backend` | `npm run build` | Compile NestJS project |
| `backend` | `npm run seed` | Seed database with starter content |
| `backend` | `npm run test` | Run unit tests |
| `backend` | `npm run test:e2e` | Run end-to-end tests |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
