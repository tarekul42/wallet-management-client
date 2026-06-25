# Wallet Management System — Client

> A full-featured digital wallet SPA built with **React 19**, **Redux Toolkit + RTK Query**, and **TypeScript**. Features role-based dashboards for Users, Agents, and Admins, a service marketplace with 1.5% fee checkout, virtual/physical card management, and a token refresh queue that prevents concurrent-refresh race conditions.

[![Live Demo](https://img.shields.io/badge/Live_Demo-vercel.app-000000?style=flat-square&logo=vercel&logoColor=white)](https://wallet-management-client.vercel.app)
[![Backend Repo](https://img.shields.io/badge/Backend_Repo-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/tarekul42/wallet-management-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 📋 Overview

This is the client-side SPA for the **Wallet Management System** — a digital wallet platform where users send money, deposit/withdraw, browse a service marketplace, and manage virtual/physical cards. Agents handle cash-in/cash-out and earn commissions. Admins manage users, agents, and system configuration (fees, commission rates, daily/monthly limits).

The frontend is built on **React 19 + Vite 7** with **Redux Toolkit + RTK Query** for state and data fetching. It ships with a **token refresh queue** that prevents one of the most common JWT race conditions, and **one-click demo login** for User / Agent / Admin roles so reviewers can explore every dashboard instantly.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + Vite 7 |
| Language | TypeScript 5.8 |
| State | Redux Toolkit + RTK Query |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix) |
| Forms | React Hook Form + Zod |
| HTTP | Axios with interceptors (auth, refresh) |
| Animation | Motion (v12) |
| Charts | Recharts 3 |
| Notifications | Sonner |
| Icons | Lucide React |
| Theme | Light / Dark / System |
| Testing | Vitest + Playwright (E2E) |
| Package Manager | Bun |

---

## ✨ Main Features

- **Token refresh queue** — when multiple RTK Query mutations fail with 401 simultaneously, only the first refresh request goes through; the rest queue and replay once the new token arrives. Prevents the classic "refresh race condition" where concurrent refreshes invalidate each other (each refresh rotates the refresh token, killing the previous one).
- **One-click demo login** — three buttons (User / Agent / Admin) auto-fill seeded credentials from env vars, so reviewers can explore every dashboard without registering. Seeded with realistic data ($7,177.50 user balance, $9,630 agent balance) so charts and tables look real immediately.
- **Role-based dashboards** — User (balance, spending chart, cards, transactions, purchases), Agent (balance, commission, customers, success rate, cash-in/out, commission history), Admin (totals, user/agent/wallet management, system config)
- **Service marketplace** — browse with search/category/rating filters + sort, service details with reviews + related services, dedicated checkout with live 1.5% fee calculation, "My Purchases" view
- **Virtual & physical card management** — copy card details, freeze/unfreeze cards
- **Multi-step registration** — email → OTP → phone OTP → password flow
- **Axios interceptor with auto-refresh** — auto-attaches `Authorization: Bearer` header, handles 401 with silent refresh
- **Light / Dark / System theme** with persisted preference
- **Animated charts** — area chart for last-30-days income/expenses, animated counter stat cards
- **E2E test coverage** — auth flows, dashboard interactions, public pages, registration flow, role-based access, theme switching

---

## 📦 Main Dependencies

### Runtime Dependencies
| Package | Purpose |
|---------|---------|
| `react@^19.1.1` / `react-dom@^19.1.1` | UI runtime |
| `vite@^7.1.2` + `@vitejs/plugin-react@^5.0.0` | Build tool & dev server |
| `@reduxjs/toolkit@^2.8.2` + `react-redux@^9.2.0` | State management |
| `react-router@^7.8.1` | Routing |
| `axios@^1.13.1` | HTTP client (with auth interceptors) |
| `react-hook-form@^7.62.0` + `@hookform/resolvers@^5.2.1` | Form management |
| `zod@^4.0.17` | Schema validation |
| `motion@^12.23.12` | Animations |
| `recharts@^3.8.1` | Charts (income/expense, analytics) |
| `radix-ui@^1.4.3` + `@radix-ui/react-toast` + `@radix-ui/react-tooltip` + `@radix-ui/react-label` + `@radix-ui/react-slot` | Accessible UI primitives |
| `lucide-react@^0.540.0` | Icons |
| `sonner@^2.0.7` | Toast notifications |
| `jwt-decode@^4.0.0` | Client-side JWT decoding |
| `tailwindcss@^4.1.12` + `@tailwindcss/vite` | Styling |
| `class-variance-authority` + `clsx` + `tailwind-merge` | Class utilities |
| `tw-animate-css` | Tailwind animation utilities |

### Dev Dependencies (key ones)
| Package | Purpose |
|---------|---------|
| `vitest@^4.1.9` + `@vitest/coverage-v8` | Unit testing |
| `@playwright/test@^1.61.0` | E2E testing |
| `@testing-library/react@^16.3.2` + `@testing-library/user-event@^14.6.1` | Component testing |
| `eslint@^9.33.0` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` | Linting |
| `typescript@~5.8.3` | Type safety |
| `happy-dom@^20.10.6` + `jsdom@^29.1.1` | DOM environments for tests |

---

## 🚀 Run Locally

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Backend API running — see the [Backend Repository](https://github.com/tarekul42/wallet-management-api)

### Installation

```bash
# 1. Clone
git clone https://github.com/tarekul42/wallet-management-client.git
cd wallet-management-client

# 2. Install dependencies
bun install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your values (see table below)

# 4. Run dev server
bun run dev
```

Open http://localhost:5173 in your browser.

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:5000/api/v1` |
| `VITE_DEMO_USER_EMAIL` | Demo user email (one-click login) | `demo.user@example.com` |
| `VITE_DEMO_USER_PASSWORD` | Demo user password | `DemoUser123!` |
| `VITE_DEMO_AGENT_EMAIL` | Demo agent email | `demo.agent@example.com` |
| `VITE_DEMO_AGENT_PASSWORD` | Demo agent password | `DemoAgent123!` |
| `VITE_DEMO_ADMIN_EMAIL` | Demo admin email | `demo.admin@example.com` |
| `VITE_DEMO_ADMIN_PASSWORD` | Demo admin password | `DemoAdmin123!` |

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Vite dev server |
| `bun run build` | TypeScript check + Vite production build |
| `bun run preview` | Preview production build on port 3000 |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | TypeScript compiler check |
| `bun run test` | Run Vitest unit tests |
| `bun run test:watch` | Run Vitest in watch mode |
| `bun run test:e2e` | Run Playwright E2E tests |

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| 🌐 **Live Demo** | https://wallet-management-client.vercel.app |
| 🖥️ **Backend Repo** | https://github.com/tarekul42/wallet-management-api |
| 📧 **Contact** | tarekulrifat142@gmail.com |

---

## 📄 License

MIT © Tarekul Islam Rifat

---

<div align="center">

**⭐ If this project helped you, give it a star!**

Built with ❤️ by [Tarekul Islam Rifat](https://github.com/tarekul42)

</div>
