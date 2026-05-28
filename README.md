# Wallet Management Client

A digital wallet management SPA built with React and Redux Toolkit, featuring role-based dashboards for users, agents, and admins with secure transaction handling.

## Features

- **Role-based dashboards**: Separate views for User, Agent, and Admin roles
- **Multi-step registration**: 4-step wizard (basic info → email OTP → phone OTP → password)
- **Transaction management**: Send money, deposit, withdraw with fee calculation
- **Token refresh queue**: Prevents concurrent token refresh race conditions
- **Theme system**: Light, dark, and system preference modes
- **Form validation**: Zod schemas with React Hook Form integration
- **Landing page**: Full marketing site with hero, features, stats, testimonials, and FAQ

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Language | TypeScript 5.8 |
| State | Redux Toolkit + RTK Query |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix) |
| Forms | React Hook Form + Zod |
| HTTP | Axios with interceptors |
| Animation | Framer Motion |
| UI | Sonner, Lucide React |

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
src/
├── components/       # shadcn/ui component library
├── config/           # App configuration
├── constants/        # Role constants
├── context/          # Theme context
├── hooks/            # Custom hooks (useTheme)
├── lib/              # Axios instance, utilities
├── pages/            # Route pages (Home, Login, Register, Dashboard, About, FAQ, Contact)
├── providers/        # Theme provider
├── redux/            # Store, slices, RTK Query APIs (auth, user, agent, admin)
├── routes/           # Router config + withAuth HOC
├── schemas/          # Zod validation schemas
├── types/            # Shared TypeScript types
└── utils/            # JWT decode, auth helpers
```

## API

Connects to the [wallet-management-api](https://github.com/tarekul42/wallet-management-api) backend.
