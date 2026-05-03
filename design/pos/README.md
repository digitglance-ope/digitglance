# Handoff: Digitglance POS & Inventory Management System

> Design reference package for Claude Code (or any developer) to implement the Digitglance POS module as a real, production-grade SaaS product inside the wider Digitglance multi-tenant platform.

---

## 1. Overview

**Product:** Digitglance POS & Inventory Management System
**Position:** Module #2 inside the shared Digitglance SaaS platform
**Routing:** `app.digitglance.com/pos` (auth, tenant, billing, audit, reporting, permissions are SHARED with the wider platform — do **not** build them as standalone)
**Primary market:** Nigerian SMEs · supermarkets, pharmacies, restaurants, electronics, fashion, building materials, wholesalers, manufacturing, schools, professional services
**Currency:** Naira (₦) primary, multi-currency aware
**Tax regime:** Nigerian VAT 7.5% (FIRS) — vatable / zero-rated / exempt / non-vatable

---

## 2. About the Design Files

The files in `preview/` are **design references** — interactive HTML/React prototypes that demonstrate intended **look, layout, behavior, and information density**. They are NOT production code to ship as-is.

Your job (Claude Code / dev team) is to **recreate these designs inside the existing Digitglance codebase**, using its established framework, libraries, design tokens, auth, database, and module conventions. If no codebase exists yet, choose the appropriate stack (recommended: **Next.js + TypeScript + tRPC + Prisma + PostgreSQL + Tailwind + shadcn/ui**, with **Clerk** or custom shared auth, **Stripe/Paystack** for billing).

Treat the prototypes as the **specification**, not the implementation.

## 3. Fidelity

**High-fidelity.** Colors, typography, spacing, density, and component composition are final. Re-implement pixel-faithfully against the design tokens in §7. Interactions shown in the prototype (cart line edits, payment modal, command palette, route switches) reflect intended UX.

---

## 4. Architecture (mandatory)

The POS module MUST plug into the shared platform — never duplicate these systems:

| Concern              | Source of truth                                                |
|----------------------|----------------------------------------------------------------|
| Authentication       | Shared platform SSO (single login for all modules)             |
| Tenant isolation     | Shared `tenant_id` row-level security on every table           |
| User & role registry | Shared identity service                                        |
| Permissions          | Shared RBAC; POS adds module-scoped permissions                |
| Subscription/billing | Shared billing; POS exposes its plan tiers + feature flags     |
| Audit log            | Shared append-only audit stream; POS emits events into it      |
| Notifications        | Shared notification bus (in-app, email, WhatsApp, SMS)         |
| Reports & analytics  | Shared reporting layer; POS exposes datasources                |
| Database             | Shared PostgreSQL cluster; POS owns its schema (`pos.*`)       |
| Chart of accounts    | Shared accounting module; POS posts journals into it           |

### 4.1 Module surface

```
app.digitglance.com/             ← shared shell, login, tenant picker
app.digitglance.com/pos          ← THIS module (entry: dashboard)
app.digitglance.com/pos/terminal ← cashier POS screen (full-bleed)
app.digitglance.com/pos/inventory
app.digitglance.com/pos/customers
app.digitglance.com/pos/vendors
app.digitglance.com/pos/vat
app.digitglance.com/pos/reports
app.digitglance.com/pos/settings
app.digitglance.com/pos/onboarding   ← first-run wizard
```

---

## 5. Screen Map

Each screen is implemented in `preview/` — open `index.html` and click through the sidebar.

### 5.1 Dashboard (`/pos`)
Premium overview. KPIs (Today's sales, Cash position, Receivables, Payables) with sparkline + delta-vs-yesterday. 14-day sales trend chart. Cash & bank donut. Branch performance bars vs target. Top sellers list. Hourly velocity bar chart. VAT position card with FIRS filing CTA. Stock alerts (red/amber/teal severity). Live activity feed (4 terminals). Staff leaderboard with GP %.

### 5.2 POS Terminal (`/pos/terminal`) — HERO SCREEN
Two-pane: catalogue left (1.4fr), cart right (460px).
- **Left:** Search bar (F2 focus, barcode scan-friendly). Category strip. ★ Favorites (12, keys 1–9). Product grid with VAT badges, low-stock chips, retail price, on-hand count. Status bar: terminal ID, shift ID, online/offline, cash drawer, last sync.
- **Right:** Sale header (invoice #, customer with credit/balance). Cart lines with qty steppers, VAT badge per line, line discount. Action row: discount (F8), note, tax override, hold (F9), void. Totals: subtotal excl. VAT, VAT 7.5%, invoice discount. Charge button (F10) → payment modal.
- **Payment modal:** 7 methods (Cash, POS Card, Bank Transfer, USSD, OPay/Wallet, On Credit, Voucher) with F-keys. Split payment. Cash tendered with Naira denomination quick-tender (₦5K/10K/20K/50K/100K/Exact/Clear). Change due / short-by indicator. Complete sale (F10).

### 5.3 Inventory (`/pos/inventory`)
KPI strip (SKUs active, Stock at cost, Retail value, Below reorder, Inbound 7d). Tabs: Products, Stock movements, Transfers, Goods receipts, Counts & adjustments, Valuation. Products table: SKU, image thumb, barcode, category, VAT class, cost, price, margin, on-hand, reorder, value. Movements ledger with typed badges. Valuation tab: side-by-side FIFO/LIFO/Weighted Avg/Standard cost cards with switch-method warning.

### 5.4 VAT & FIRS (`/pos/vat`)
Filing card (net liability, output, input, status, days to file). 3-step filing workflow (reconcile → review → file at FIRS). Classification breakdown table (V/Z/E/N). Filing history with FIRS reference numbers.

### 5.5 Customers (`/pos/customers`)
KPI strip (Active, Outstanding A/R, Overdue >30d, Avg collection days). Table: avatar, tier, phone, credit limit, balance, utilization bar, aging bucket sparkline (0/30/60/90+).

### 5.6 Vendors (`/pos/vendors`)
KPI strip (Active vendors, Outstanding A/P, Due this week, Avg payment days). Table: rating pill, terms, contact, since, outstanding, pay action.

### 5.7 Reports (`/pos/reports`)
Three groups: Sales (5 reports), Inventory (4), Finance (6). Card grid with icon, title, description, CSV/PDF export pills. + Custom report builder.

### 5.8 Onboarding wizard (`/pos/onboarding`)
9 steps with progress bar: Business registration → Company profile → Tax & VAT → Branches → Bank accounts → POS terminals → Costing method → Invite staff → Subscription. Two-pane: stepper left, current step form right. Bank linking via Mono/Okra OAuth.

### 5.9 Settings (`/pos/settings`)
Six groups: Tenant, Operations, Tax & finance, People, Inventory, Integrations.

### 5.10 Mobile views
- **Manager dashboard** — KPI summary, branch list, stock alerts, VAT due CTA
- **Approvals** — discount/refund/transfer cards with approve/reject swipe
- **Stock count** — full-screen barcode scanner with variance display

---

## 6. Components & Primitives

Re-implement these in your component library (see `preview/primitives.jsx` for reference behavior):

- `<Card title action>` — bordered surface with optional title row
- `<KPI label value delta sub accent sparkline>` — KPI tile
- `<Sparkline data w h color>` — area-filled line
- `<Bars data height accessor highlight>` — bar chart
- `<Btn kind size icon kbd>` — button with kinds: primary | success | danger | solid | ghost | soft | tealsoft
- `<SearchInput value onChange placeholder kbd>` — search box with kbd hint
- `<Donut segments size thickness label>` — donut chart
- `<VatBadge cls>` — V/Z/E/N micro pill
- `<MoveTypeBadge type>` — typed stock-move pill
- `<CommandPalette>` — ⌘K palette (Navigate + Actions groups)
- `<TweaksPanel>` — design knobs (theme/density/POS layout) — DEV ONLY, remove in production

---

## 7. Design Tokens

### Colors
```css
--teal-900: #06504F;   /* deep brand ink */
--teal-700: #0E8383;   /* PRIMARY brand */
--teal-600: #119999;
--teal-100: #DBF1F0;
--teal-50:  #ECF8F7;

--lime-700: #2BAA00;
--lime-600: #37D200;   /* SECONDARY · success · money-positive */
--lime-100: #DFF8D2;

--ink-900:  oklch(20% 0.015 220);  /* body text */
--ink-700:  oklch(35% 0.012 220);
--ink-500:  oklch(52% 0.010 220);  /* secondary text */
--ink-400:  oklch(64% 0.008 220);
--ink-300:  oklch(78% 0.006 220);

--paper:    oklch(99% 0.004 180);  /* cards */
--paper-2:  oklch(97.5% 0.005 180);/* page background */
--paper-3:  oklch(95% 0.006 180);  /* recessed surfaces */

--line:     oklch(91% 0.006 200);  /* hairlines */
--line-2:   oklch(86% 0.007 200);

--amber:    oklch(72% 0.14 70);    /* warning */
--amber-bg: oklch(95% 0.04 80);
--rose:     oklch(58% 0.18 25);    /* danger / negative */
--rose-bg:  oklch(95% 0.03 25);
```

**Usage rule:** teal = primary brand, surfaces, links, primary CTAs. Lime = reserved for success state, money-positive deltas, "complete sale" CTA. Don't use lime as decoration.

### Typography
- **UI:** `IBM Plex Sans` (300/400/500/600/700)
- **Numbers, codes, monospace cells:** `IBM Plex Mono` (400/500/600) with `font-feature-settings: "tnum"`
- **Optional serif accents:** `IBM Plex Serif`
- Base size 14px, line-height 1.4, `-webkit-font-smoothing: antialiased`

### Spacing & Radii
- 8px grid; gaps: 4 / 6 / 8 / 10 / 12 / 16 / 20 / 24
- Radii: 4 (xs) / 6 (sm — most controls) / 8 (md — cards) / 12 (lg — modals) / 16 (xl)
- Borders: 1px hairline at `--line`; `--line-2` for input borders

### Density
Two modes: comfortable (default) and compact (13px base, tighter row padding). Expose as user preference.

---

## 8. Data Model (suggested PostgreSQL schema, `pos.*`)

```sql
-- All tables: tenant_id uuid not null + RLS policy

pos.branch          (id, tenant_id, name, address, is_hq, ...)
pos.terminal        (id, tenant_id, branch_id, code, status)
pos.shift           (id, tenant_id, terminal_id, user_id, opened_at, closed_at, opening_float, closing_amount)
pos.category        (id, tenant_id, name, parent_id)
pos.product         (id, tenant_id, sku, barcode, name, category_id, unit, vat_class enum('V','Z','E','N'),
                     cost numeric, price numeric, reorder_level, safety_stock, batch_tracked, serial_tracked, expiry_tracked)
pos.stock           (product_id, branch_id, on_hand, reserved, last_count_at)  -- composite PK
pos.stock_move      (id, tenant_id, ref, type enum(...), source_branch_id, dest_branch_id, by_user_id, posted_at, value)
pos.stock_move_line (move_id, product_id, qty, cost_at_move, batch_no, expiry, serial_no)
pos.customer        (id, tenant_id, name, phone, tier, credit_limit, balance)
pos.vendor          (id, tenant_id, name, terms, rating, balance, contact)
pos.sale            (id, tenant_id, branch_id, terminal_id, shift_id, cashier_id, customer_id,
                     invoice_no, status enum('draft','held','completed','voided','returned'),
                     subtotal, vat_total, discount_total, grand_total, posted_at)
pos.sale_line       (sale_id, product_id, qty, unit_price, line_discount, vat_class, vat_amount, line_total)
pos.payment         (id, sale_id, method, amount, ref, gateway_payload jsonb)
pos.purchase_bill   (id, tenant_id, vendor_id, bill_no, status, subtotal, vat_total, grand_total, due_date)
pos.vat_period      (id, tenant_id, period, output_vat, input_vat, liability, status, firs_ref, filed_at)
pos.costing_method  (tenant_id pk, method enum('FIFO','LIFO','WAVG','STD'))
pos.audit_event     (id, tenant_id, actor_id, entity_type, entity_id, action, before jsonb, after jsonb, at)
```

VAT calculation: at sale-line level, compute VAT from `vat_class` × `unit_price` × `qty`. Inclusive pricing: `vat = net × 0.075 / 1.075`.

---

## 9. State, Interactions, Shortcuts

### POS terminal keyboard map (must implement)
| Key | Action |
|-----|--------|
| F2 | Focus product search |
| F4 | Customer picker |
| F8 | Apply discount |
| F9 | Suspend (hold) transaction |
| F10 | Charge / open payment |
| F1–F7 (in payment) | Select payment method |
| Esc | Clear cart / close modal |
| Ctrl+P | Reprint last receipt |
| Ctrl+R | Return mode |
| Ctrl+D | Open cash drawer |
| ↑/↓ | Navigate cart lines |
| ⌘K / Ctrl+K | Command palette |

Barcode scanner = USB HID keyboard wedge: capture stream into search input when focused, auto-submit on Enter or after 50ms quiet period.

### Critical flows
1. Shift open → opening float entry → log `shift.opened` event.
2. Sale: scan/search → add line → adjust qty/discount → choose customer → charge → split payments → print receipt → log to audit + post journal.
3. Suspend → resume by hold ID; suspended sales survive shift close.
4. Return: reference original invoice, allow partial line-level returns, restock to source branch.
5. Cash drawer reconcile at shift close: counted vs expected, post variance.

---

## 10. Recommended Stack

If green-field:
- **Frontend:** Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui + Recharts (or Visx)
- **State:** Zustand for terminal local state, TanStack Query for server state
- **Backend:** tRPC (or REST/Hono) + Prisma + PostgreSQL with RLS
- **Auth:** Shared SSO — Clerk, Auth.js, or custom JWT validated by gateway
- **Realtime:** Supabase Realtime / Pusher for live activity feed
- **Payments:** Paystack + Flutterwave + manual cash/transfer
- **Print:** ESC/POS via WebUSB or local print bridge
- **Background jobs:** BullMQ (Redis) for VAT recalc, valuation, reports
- **Hosting:** Vercel (web) + Supabase or Neon (db) + Cloudflare R2 (assets)

---

## 11. Files in this bundle

```
design_handoff_digitglance_pos/
├── README.md                  ← this file
└── preview/
    ├── index.html             ← entry, design tokens, font loading
    ├── app.jsx                ← shell, sidebar, topbar, command palette
    ├── data.jsx               ← Naira-denominated SME demo data + helpers
    ├── primitives.jsx         ← Card, KPI, Sparkline, Btn, SearchInput, Donut
    ├── dashboard.jsx          ← dashboard module
    ├── pos.jsx                ← POS terminal + payment modal
    ├── inventory.jsx          ← inventory module
    ├── modules.jsx            ← VAT, Customers, Vendors, Reports, Onboarding, Settings
    ├── mobile.jsx             ← manager mobile + scan stock count
    ├── tweaks-panel.jsx       ← (dev-only) design tweaks panel
    └── assets/
        └── digitglance-logo.png
```

To run the prototype locally: open `preview/index.html` in any browser. No build step.

---

## 12. Build order (suggested)

1. Tenant + auth + RBAC plumbing into shared platform shell
2. Settings → Branches, Terminals, Bank accounts, Costing method
3. Catalogue → Categories, Products, VAT classes, Units of measure
4. Inventory → Stock, GRN, Transfers, Counts
5. POS Terminal (HERO) → shift, cart, payment, receipt, audit, journal
6. Customers + Vendors + A/R + A/P
7. VAT engine → classification, monthly summary, FIRS export
8. Reports center
9. Onboarding wizard
10. Mobile manager + scan app

Ship Phase 1 (steps 1–5) as a usable single-branch POS, then iterate.

---

## 13. Open questions for the dev team

- FIRS e-invoicing API integration spec (current FIRS rules)
- Receipt printer model(s) targeted (Epson TM-T82 / Xprinter / Sunmi K2)
- Offline mode: how long can a terminal run disconnected before forcing sync?
- WhatsApp receipts: Twilio vs Cloud API direct?
- Multi-currency: which secondary currencies, and when do they apply (display vs settle)?
