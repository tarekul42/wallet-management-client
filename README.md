# Wallet Management Client

A full-featured digital wallet management SPA built with React 19, Redux Toolkit, and TypeScript. Features role-based dashboards for users, agents, and admins with secure transaction handling, a service marketplace, and package purchase flow.

## Features

### 💰 Core Wallet
- **Dashboard**: Real-time balance, income/expense chart, transaction table, quick actions
- **Send Money**: Transfer funds to other users with fee calculation
- **Deposit / Withdraw**: Add or withdraw money from your wallet
- **Transaction History**: Paginated, filterable, searchable transaction log
- **Cards**: Virtual and physical card management (copy, freeze/unfreeze)

### 🛒 Service Marketplace
- **Browse Services**: Explore available services with search, category filter, rating filter, and sort
- **Service Details**: Full service page with description, reviews, related services, pricing
- **Checkout**: Dedicated checkout page with amount input, live fee calculation (1.5%), and wallet payment
- **My Purchases**: View purchased services with service image, title, date, amount, and fee on the dashboard

### 👥 Role-Based Dashboards
- **User Dashboard**: Balance overview, spending chart, card management, transaction table, purchases
- **Agent Dashboard**: Current balance, total commission, active customers, success rate, cash-in/out to users, commission history
- **Admin Dashboard**: Total users, active agents, transaction volume, user/agent/wallet management, system config

### 🔐 Auth & Security
- JWT-based authentication with access/refresh token rotation
- Token refresh queue prevents concurrent refresh race conditions
- Axios interceptor auto-attaches `Authorization: Bearer` header and handles 401 with refresh
- Role-based route protection
- Multi-step registration (email → OTP → phone OTP → password)
- Social login with Google OAuth
- Forgot/reset password flow

### 🎨 UX
- **Light / Dark / System** theme toggle
- Responsive design with mobile sidebar
- Framer Motion animations
- Toast notifications via Sonner
- One-click demo login (User / Agent / Admin) using env-configured credentials

### 📊 Charts & Data
- Area chart for daily income/expenses (last 30 days)
- Dashboard stat cards with animated counters
- Paginated data tables with search and date filtering

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Language | TypeScript 5.8 |
| State | Redux Toolkit + RTK Query |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix) |
| Forms | React Hook Form + Zod |
| HTTP | Axios with interceptors (auth, refresh) |
| Animation | Framer Motion |
| Charts | Recharts |
| UI | Sonner (toast), Lucide React (icons) |

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/tarekul42/wallet-management-client
cd wallet-management-client
bun install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Configure the environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:5000/api/v1` |
| `VITE_DEMO_USER_EMAIL` | Demo user email for quick login | `demo.user@example.com` |
| `VITE_DEMO_USER_PASSWORD` | Demo user password | `DemoUser123!` |
| `VITE_DEMO_AGENT_EMAIL` | Demo agent email | `demo.agent@example.com` |
| `VITE_DEMO_AGENT_PASSWORD` | Demo agent password | `DemoAgent123!` |
| `VITE_DEMO_ADMIN_EMAIL` | Demo admin email | `demo.admin@example.com` |
| `VITE_DEMO_ADMIN_PASSWORD` | Demo admin password | `DemoAdmin123!` |

### 3. Run

```bash
bun run dev
```

The app is available at `http://localhost:5173`.

## User Flow

```
/explore                 → Browse all services
/explore/:id             → Service details & reviews
/checkout/:id            → Enter amount, see fee, pay with wallet
/dashboard               → Auto-redirects to role dashboard
/dashboard/user          → Full user dashboard with My Purchases
```

### Quick Login
The Login page has one-click buttons for **User**, **Agent**, and **Admin** that auto-fill credentials from `VITE_DEMO_*` environment variables.

## Project Structure

```
src/
├── assets/           # Static data, images
├── components/       # Reusable UI components
│   ├── layout/       # RootLayout, DashboardLayout, Sidebar
│   ├── modules/      # Dashboard modules (DashboardShell, DashboardStats,
│   │                 # SpendingChart, TransactionTable, MyPurchases, DashboardIndex)
│   └── ui/           # shadcn/ui components (Button, Card, Input, Badge, etc.)
├── config/           # App configuration
├── constants/        # Role constants, route paths
├── context/          # Theme context provider
├── hooks/            # Custom React hooks
├── lib/              # Axios instance, cn() utility
├── pages/            # Route pages
│   ├── Dashboard/    # User, Agent, Admin dashboards + sub-pages
│   └── Register/     # Multi-step registration
├── providers/        # Theme provider
├── redux/            # Redux store, slices, RTK Query APIs
│   └── features/     # auth, user, agent, admin, services, cards
├── routes/           # Router config, dashboard routes, withAuth HOC
├── schemas/          # Zod validation schemas for forms
├── types/            # Shared TypeScript interfaces
└── utils/            # JWT decode, lazy loading
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Vite dev server |
| `bun run build` | TypeScript check + Vite production build |
| `bun run preview` | Preview production build on port 3000 |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript compiler check |
| `bun test` | Run unit tests (Vitest) |
| `bun run test:e2e` | Run Playwright e2e tests |

## API

Connects to the [wallet-management-api](https://github.com/tarekul42/wallet-management-api) backend at the URL configured in `VITE_BASE_URL`.

### Key RTK Query Endpoints (Frontend)

| Hook | Endpoint | Description |
|------|----------|-------------|
| `useGetServicesQuery` | `GET /services` | Paginated services with search/filter |
| `useGetServiceByIdQuery` | `GET /services/:id` | Single service details |
| `useGetMyPurchasesQuery` | `GET /services/my-purchases` | Purchase history with populated service |
| `useBuyServiceMutation` | `POST /services/:id/purchase` | Purchase a service (invalidates WALLET + TRANSACTION) |
| `useGetAccountBalanceQuery` | `GET /wallets/me` | Current wallet balance |
| `useSendMoneyMutation` | `POST /transactions/send-money` | Send money to another user |
| `useGetDashboardSummaryQuery` | `GET /agent/summary` | Agent dashboard summary |
| `useGetMyCardsQuery` | `GET /cards/my-cards` | User's virtual/physical cards |
