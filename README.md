# Rugab Dynamic Logistics Platform

A secure, database-backed logistics company website **and** operations web app, built with
Next.js (App Router). It is not just a static site — it ships a real, working workflow from
quote request → admin review → shipment → rider delivery → public tracking, designed to
extend cleanly across three phases.

> **Build status:** All three phases are implemented and verified (`npm run build` passes,
> all routes render, auth + RBAC enforced, full quote→delivery lifecycle tested end-to-end
> including state-machine gating, notifications/email/Paystack logic tested).

---

## Features

### Phase 1 — ✅ Implemented
- **Public website:** Home, About, Services, Customs Service, Quote, Contact, Track Shipment.
- **Quote request form** — Zod-validated, rate-limited, saved to DB, generates a unique tracking code.
- **Contact form** — validated, rate-limited, saved to DB.
- **Public tracking** — look up a quote/shipment by tracking code; shows only safe public fields + status timeline.
- **Authentication** — register (customer), login, logout via Auth.js / NextAuth v5 (credentials, bcrypt).
- **Role-based dashboards** with server-side guards + edge middleware (ADMIN / CUSTOMER / RIDER).
- **Admin dashboard** — overview stats, quote requests (search + pagination + detail), contact messages (mark read/resolved), audit log feed.
- **Customer dashboard** — sees their own quote requests.
- **Audit logging** for major actions; in-memory rate limiting for auth/quote/contact/tracking.

### Phase 2 — ✅ Implemented
- **Quote pricing + approval/rejection** (admin) — approve auto-creates a shipment from the quote.
- **Shipment management** — admin list (search + status filter + pagination) and detail page.
- **Rider management** — admin creates rider/operator accounts, manages availability.
- **Rider assignment** — admin assigns/reassigns; rider accepts or rejects.
- **Status workflow** — full state machine (`APPROVED → ASSIGNED → ACCEPTED → PICKED_UP → IN_TRANSIT → DELIVERED`, plus `FAILED`/`CANCELLED`), enforced server-side; every change writes a `ShipmentStatusLog`.
- **Proof of delivery** — rider submits receiver/note/image; visible to admin.
- **Payments** — admin updates payment status and records payment entries; payments dashboard with totals.
- **Customer views** — own shipments list + detail with live timeline and payment status.
- **Rider dashboard** — active assignments, per-shipment actions, completed deliveries.

### Phase 3 — ✅ Implemented
- **Notifications** — in-app notification bell (with unread count + mark-all-read) on every dashboard, fired on key events: new quote/contact (admins), quote approved & shipment delivered (customer), rider assigned (rider).
- **Email** — Nodemailer transport that sends when SMTP env vars are set and logs to console otherwise, so dev never breaks. Wired into the same events.
- **Public tracking by code** — live on `/track` (quote or shipment), exposing only safe fields.
- **Reports** — admin reports page with revenue (paid), totals, shipments-by-status bars, quotes-by-status, and delivery rate.
- **Paystack** — server-side `initializeTransaction` (amount in kobo, NGN). Admin can initialize a checkout from a shipment; returns a clear "not configured" message until `PAYSTACK_SECRET_KEY` is set.

### Scalability built in
- Notifications/email go through a single `lib/notify.ts` layer — swap in SMS/WhatsApp by adding a sender.
- Rate limiter (`lib/rate-limit.ts`) is swap-ready for Redis/Upstash without touching call sites.
- Postgres-portable schema; status state-machine centralized in `lib/constants.ts`.

---

## Tech Stack
- **Next.js 14 (App Router)** + **TypeScript** (strict) + Server Components / Server Actions
- **Tailwind CSS** (custom navy/green logistics brand)
- **Prisma ORM** — SQLite for local dev, **PostgreSQL-ready** for production
- **Auth.js / NextAuth v5** (credentials, JWT sessions) + **bcryptjs**
- **Zod** validation, **lucide-react** icons
- **Nodemailer** (email, optional SMTP) + **Paystack** REST integration (optional)

---

## Folder Structure
```
app/
  (public)/          # public website (home, about, services, quote, customs, contact, track)
  (auth)/            # login, register
  dashboard/         # admin / customer / rider dashboards (role-guarded)
  actions/           # server actions: quote, contact, auth, track, session
  api/auth/          # NextAuth route handler
components/           # ui / layout / forms / dashboard / public
lib/                  # db, auth helpers, validations, permissions, constants, audit, rate-limit, utils, types
prisma/               # schema.prisma, seed.ts
types/                # NextAuth type augmentation
auth.ts, auth.config.ts, middleware.ts
```

---

## Setup

### 1. Install
```bash
npm install
```

### 2. Environment
Copy the example and adjust as needed (defaults work for local SQLite):
```bash
cp .env.example .env
```
Generate a real secret for `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Database (create + seed)
```bash
npm run db:push        # create/update the schema
npm run db:seed        # load demo accounts + sample data
```

To create only an admin account without demo data:
```bash
ADMIN_EMAIL="admin@rugab.com" ADMIN_PASSWORD="change-this-password" npm run db:seed:admin
```

### 4. Run
```bash
npm run dev            # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run db:studio` (Prisma Studio).

---

## Demo Login Accounts
| Role     | Email                | Password      |
|----------|----------------------|---------------|
| ADMIN    | admin@rugab.com      | `Admin@123`   |
| CUSTOMER | customer@rugab.com   | `Customer@123`|
| CUSTOMER | amaka@rugab.com      | `Customer@123`|
| RIDER    | rider@rugab.com      | `Rider@123`   |
| RIDER    | rider2@rugab.com     | `Rider@123`   |

**Sample tracking codes** (try them on `/track`): `RGB-DEMO0001`, `RGB-DEMO0002`,
`RGB-SHIP0001` (in transit), `RGB-SHIP0002` (delivered).

---

## User Roles
- **ADMIN** — full operational access: quotes, shipments, riders, customers, payments, messages, audit logs, reports.
- **CUSTOMER** — submit/track quotes & shipments, view own records, manage profile.
- **RIDER / OPERATOR** — view assigned shipments, accept/reject, update status, upload proof of delivery.

---

## A–Z Operational Flow
1. Visitor submits a quote request → system generates a tracking code.
2. Admin reviews the quote in the dashboard.
3. Admin adds an estimated price + internal note.
4. Admin approves (auto-creates the shipment) or rejects the quote.
5. Admin assigns a rider/operator.
6. Rider accepts or rejects the assignment.
7. Rider updates status: picked up → in transit → delivered/failed (a reason is required to fail).
8. Rider uploads proof of delivery.
9. Customer views the shipment timeline; anyone can track via the public tracking code.
10. Admin updates payment status (and optionally records a payment entry).
11. Every major action is recorded in the audit log.

All status changes are validated against the state machine in `lib/constants.ts` on the
server, so illegal transitions (e.g. `APPROVED → DELIVERED`) are rejected regardless of UI.

Shipment status state-machine (`lib/constants.ts`):
`PENDING → QUOTED → APPROVED → ASSIGNED → ACCEPTED → PICKED_UP → IN_TRANSIT → DELIVERED`,
with `REJECTED`, `FAILED`, and `CANCELLED` allowed from their valid source states only.

---

## Security Notes
- Passwords hashed with **bcrypt** (cost 12). Sessions are JWT via Auth.js.
- **All server actions and dashboards verify auth + role on the server** (`lib/permissions.ts`),
  not just in the UI — edge middleware (`middleware.ts`) is a first gate, server checks are the real one.
- **All inputs validated with Zod** before persistence.
- **Rate limiting** on auth, quote, contact, and tracking endpoints.
- **Public tracking exposes only safe fields** — no customer/rider identities, phone numbers,
  street addresses, fees, or internal notes.
- Secrets come from environment variables; none are committed. Login errors are generic to
  avoid user enumeration.
- Audit logging for major actions (`lib/audit.ts`).

---

## Switching to PostgreSQL (production)
Set `DATABASE_URL` to your Postgres connection string. The npm scripts generate an ignored
Prisma schema at `prisma/schema.generated.prisma` with the correct datasource provider:
`file:` URLs use SQLite locally, and `postgresql://` / `postgres://` URLs use PostgreSQL
for production.

After setting the production `DATABASE_URL`, run the schema push against that database:
```bash
npm run db:push
```

To create only the production admin user, run:
```bash
DATABASE_URL="your-production-postgres-url" ADMIN_EMAIL="admin@rugab.com" ADMIN_PASSWORD="use-a-strong-password" npm run db:seed:admin
```

Do not use `npm run db:seed` for production unless you explicitly want demo data; it clears
and recreates sample records.

The models are written to be portable (string-typed enums, no DB-native enum types), so no
model changes are required.

---

## Deployment Notes
- Deploy on any Node host or Vercel. Provide a managed Postgres (Neon, Supabase, RDS) and set
  `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `AUTH_TRUST_HOST`, `NEXT_PUBLIC_APP_URL`,
  `ADMIN_EMAIL`.
- On Vercel, `AUTH_URL` and `NEXT_PUBLIC_APP_URL` should be the full production origin,
  for example `https://your-domain.com`, and `AUTH_TRUST_HOST` should be `true`.
- Seed an admin with `npm run db:seed:admin` before logging into a fresh production database;
  an empty production database has no users to authenticate.
- For multi-instance deployments, replace the in-memory rate limiter (`lib/rate-limit.ts`) with
  Redis/Upstash — the call sites stay the same.

---

## Future Improvements
Live GPS tracking, automatic dispatch, multiple branches/multi-tenant, distance-based pricing,
invoice generation, email/SMS/WhatsApp notifications, Paystack/Flutterwave payments, and a
shared API for a future mobile app.
