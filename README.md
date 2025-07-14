# BetterVex Starter Template

A modern, production-ready starter template for SaaS and product apps, featuring:
- **Real-time backend** with [Convex](https://convex.dev)
- **Authentication** with BetterAuth - (orgs, Google/GitHub, passkeys, account linking)
- **Payments** with [Polar](https://polar.sh) (subscriptions, billing, webhooks)
- **UI** built with [shadcn/ui](https://ui.shadcn.com), inspired by Linear and Notion
- **Monorepo** powered by TurboRepo, pnpm, and strict TypeScript
- **Best-in-class DX**: minimal, consistent, and highly extensible

---

## Monorepo Structure

```
apps/
  web/      # Main web app (Next.js, SaaS dashboard, auth, billing, todos)
  docs/     # Documentation app (Next.js + Fumadocs)
  landing/  # Marketing/landing app (Next.js)
packages/
  ui/       # Shared UI components (shadcn-based, Linear/Notion style)
  backend/  # Convex backend (data, auth, payments, todos, docs, notifications)
  typescript-config/ # Shared TS configs
```

---

## Core Technologies

- **Convex**: Real-time backend, data sync, and serverless functions
- **shadcn/ui**: Minimal, accessible, and beautiful UI components (no custom colors, only shadcn variables)
- **Polar**: Subscription payments, billing, and customer management
- **BetterAuth**: Secure authentication, org support, Google/GitHub, passkeys, account linking
- **TurboRepo + pnpm**: Fast monorepo tooling
- **Biome**: Linting and formatting (replaces ESLint/Prettier)

---

## Authentication

- **BetterAuth** handles all authentication flows
  - **Organization support**: Users can create/join orgs, switch orgs, and manage org members
  - **Social login**: Google and GitHub sign-in
  - **Passkeys** and **magic links** supported
  - **Account linking**: Link multiple providers to a single account
  - **Session management**: Secure, real-time sessions with Convex

---

## Payments (Polar)

- **Polar** is fully integrated for SaaS billing:
  - Multiple products/plans (Starter, Business, Enterprise)
  - Checkout, billing portal, and usage tracking
  - Webhooks for subscription state changes
  - Customer management and subscription revocation
  - All payment logic is handled via Polar’s SDK and BetterAuth plugin

---

## UI/UX Principles

- **shadcn/ui**: All UI built with shadcn components, using only shadcn color variables
- **Design**: Minimal, Linear/Notion-inspired, high attention to detail
- **Icons**: Consistent, colored icons (no overuse of cards)
- **UX**: Fast, accessible, and delightful

---

## Key Features

- **Todos**: Real-time, org-scoped todos (Convex backend)
- **Organizations**: Create, join, and switch orgs; org-level permissions
- **Authentication**: Google, GitHub, passkeys, magic links, account linking
- **Payments**: Subscription management, billing, and customer portal (Polar)
- **Docs**: Markdown/MDX docs with Fumadocs
- **Block Editor**: Collaborative, real-time block editor (BlockNote + Convex)
- **Notifications**: Real-time notifications and preferences
- **File Uploads**: (Convex storage, ready for extension)
- **Strict TypeScript**: End-to-end typesafety

---

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Set up environment variables**
   - Copy `.env.example` to `.env` and fill in all required keys (Convex, Polar, BetterAuth, Google/GitHub, etc.)
3. **Start development**
   ```sh
   pnpm dev
   ```
   - Starts all apps and backend in dev mode

4. **Run individual apps**
   ```sh
   pnpm --filter web dev      # Web app (http://localhost:3000)
   pnpm --filter docs dev     # Docs app (http://localhost:3001)
   pnpm --filter landing dev  # Landing app (http://localhost:3002)
   pnpm --filter backend dev  # Convex backend
   ```

5. **Lint & format**
   ```sh
   pnpm lint
   pnpm format
   ```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License & Credits

- MIT License
- Inspired by [Linear](https://linear.app), [Notion](https://notion.so), and [shadcn/ui](https://ui.shadcn.com)
- Built with ❤️ by the BetterVex team
